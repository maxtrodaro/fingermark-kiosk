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
import { userSession } from "../../hooks/userSession";

export const KioskPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const listKiosks = useRecoilValue(kiosksMap);
  const navigate = useNavigate();
  const { handleSignout } = userSession();
  const { kioskId } = useParams();
  const refreshKioskList = useRecoilCallback(
    ({ snapshot }) => async (kioskId) =>
      await snapshot.getPromise(kiosksMapFamily(kioskId))
  );

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
          alert("New Kiosk Created Succesfully");
        })
        .catch((err) => console.error("err", err));
    } else {
      await api
        .put(`/kiosk/${kioskId}`, newFormValues)
        .then(() => {
          alert(`Kiosk ID ${kioskId} Edited Succesfully`);
        })
        .catch((err) => console.error("err", err));
    }
    navigate("/home?update=true");
  }, [formValues]);

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
  }, [kioskId]);

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Container>
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
          bodyText="Are you sure you want to create a new kiosk?"
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
