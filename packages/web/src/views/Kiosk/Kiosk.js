import React, { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
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
import { kiosksMap } from "../../recoil/selectors/kiosks";
import { userSession } from "../../hooks/userSession";

export const KioskPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const listKiosks = useRecoilValue(kiosksMap);
  const navigate = useNavigate();
  const { handleSignout } = userSession();

  const handleSubmit = useCallback(
    (values) => {
      setOpenModal(true);
      setFormValues(values);
    },
    [setOpenModal, setFormValues]
  );

  const handleConfirm = useCallback(async () => {
    const lastId = parseInt(listKiosks.slice(-1)[0].id);

    const newFormValues = {
      ...formValues,
      isKioskClosed: formValues.isKioskClosed === "Yes" ? false : true,
      id: (lastId + 1).toString(),
    };

    await api
      .post("/kiosk", newFormValues)
      .then(({ data }) => {
        alert("New Kiosk Created Succesfully");
        navigate("/home");
      })
      .catch((err) => console.log("err", err));
  }, [formValues]);

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Container>
        <Heading>Create new Kiosk</Heading>
        <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
          <Form>
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
