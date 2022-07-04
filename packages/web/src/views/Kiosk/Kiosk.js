import React, { useCallback, useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Header,
  Container,
  Modal,
  Heading,
  InputForm,
  RadioForm,
} from "@maxtrodaro/common";
import api from "../../services/api";
import { kiosksMap, kiosksMapFamily } from "../../recoil/selectors/kiosks";
import { logsMap, logsMapFamily } from "../../recoil/selectors/logs";
import { userSession } from "../../hooks/userSession";
import { formatLogHelper } from "../../utils/formatLogHelper";

export const KioskPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const listKiosks = useRecoilValue(kiosksMap);
  const listLogs = useRecoilValue(logsMap);
  const navigate = useNavigate();
  const { handleSignout } = userSession();
  const { kioskId } = useParams();
  const refreshKioskList = useRecoilCallback(
    ({ snapshot }) => async (kioskId) =>
      await snapshot.getPromise(kiosksMapFamily(kioskId))
  );
  const createLog = useRecoilCallback(({ snapshot }) => (logData) =>
    snapshot.getPromise(logsMapFamily(logData))
  );
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const handleSubmit = useCallback(
    (values) => {
      setOpenModal(true);
      setFormValues(values);
    },
    [setOpenModal, setFormValues]
  );

  const handleConfirm = useCallback(async () => {
    let newFormValues = {
      ...formValues,
      isKioskClosed: formValues.isKioskClosed === "Yes" ? false : true,
    };

    if (!kioskId) {
      const lastId = parseInt(listKiosks.slice(-1)[0].id);

      newFormValues = {
        ...newFormValues,
        id: (lastId + 1).toString(),
      };
      await api
        .post("/kiosk", newFormValues)
        .then(() => {
          const logData = formatLogHelper(
            "Create Kiosk",
            `The user ID ${userId} create the kiosk ID ${newFormValues.id}`,
            newFormValues.id,
            userId,
            parseInt(listLogs.slice(-1)[0].id) + 1
          );
          createLog(logData).then((data) =>
            data.status === 201
              ? alert("New Kiosk Created Succesfully")
              : console.error("err", data.statusText)
          );
        })
        .catch((err) => console.error("err", err));
    } else {
      await api
        .put(`/kiosk/${kioskId}`, newFormValues)
        .then(() => {
          const logData = formatLogHelper(
            "Edit Kiosk",
            `The user ID ${userId} edit the kiosk ID ${kioskId}`,
            kioskId,
            userId,
            parseInt(listLogs.slice(-1)[0].id) + 1
          );
          createLog(logData).then((data) =>
            data.status === 201
              ? alert(`Kiosk ID ${kioskId} Edited Succesfully`)
              : console.error("err", data.statusText)
          );
        })
        .catch((err) => console.error("err", err));
    }
    navigate("/home?update=true");
  }, [formValues, createLog, navigate]);

  useEffect(() => {
    async function setCurrentKiosk() {
      refreshKioskList(kioskId).then((data) => {
        const formatedData = {
          ...data,
          isKioskClosed: data.isKioskClosed === false ? "Yes" : "No",
        };
        setInitialValues(formatedData);
      });
    }
    kioskId && setCurrentKiosk();
  }, [kioskId, setInitialValues]);

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Container className="my-6">
        <Heading>{kioskId ? "Edit Kiosk" : "Create new Kiosk"}</Heading>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            {kioskId && (
              <InputForm
                className="disabled:opacity-50"
                disabled={true}
                name="id"
                label="Id"
                type="text"
              />
            )}
            <InputForm
              name="serialKey"
              label="Serial Key"
              type="text"
              placeholder="Ex: 123"
            />
            <InputForm
              name="description"
              label="Description"
              type="text"
              placeholder="Ex: Description Test"
            />
            <InputForm
              name="storeOpensAt"
              label="Store opening time"
              type="time"
            />
            <InputForm
              name="storeClosesAt"
              label="Store closing time"
              type="time"
            />
            <RadioForm
              name="isKioskClosed"
              label1="No"
              label2="Yes"
              title="Is kiosk active?"
            />
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
              <button
                onClick={() => navigate("/home")}
                className="bg-transparent text-primary font-semibold py-2 px-4 border border-primary rounded-full"
              >
                Cancel
              </button>
              <Button type="submit">Confirm</Button>
            </div>
          </Form>
        </Formik>
      </Container>
      {openModal ? (
        <Modal
          title="Confirm Kiosk"
          initialValues={{}}
          onSubmit={() => handleConfirm()}
          bodyText={
            kioskId
              ? "Are you sure you want to edit this kiosk?"
              : "Are you sure you want to create a new kiosk?"
          }
        >
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-transparent text-primary font-semibold py-2 px-4 border border-primary rounded-full"
            >
              Cancel
            </button>
            <Button type="submit">Confirm</Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
