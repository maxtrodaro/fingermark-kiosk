import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Header,
  Table,
  Container,
  Filter,
  Modal,
  Heading,
} from "@maxtrodaro/common";

import { kiosksFilterState } from "../../recoil/atoms/kiosks";
import { kiosksMap } from "../../recoil/selectors/kiosks";
import api from "../../services/api";

export const HomePage = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const [_, setFilter] = useRecoilState(kiosksMap);
  const listKiosks = useRecoilValue(kiosksMap);
  const filteredKiosks = useRecoilValue(kiosksFilterState);
  const navigate = useNavigate();

  const handleButtonFilters = (state) => {
    const filteredKiosk =
      state === "all"
        ? listKiosks
        : listKiosks.filter((kiosk) => kiosk.isKioskClosed === state);

    setFilter(filteredKiosk);
  };

  const handleSearch = () => {
    const value = document.getElementById("search").value;

    const filteredKiosk = listKiosks.filter(
      (kiosk) =>
        kiosk.serialKey.includes(value) ||
        kiosk.description.includes(value) ||
        kiosk.id.includes(value)
    );

    document.getElementById("search").value = "";

    setFilter(filteredKiosk);
  };

  const handleDelete = async (data) => {
    await api
      .delete(`/kiosk/${data.id}`)
      .then(() => {
        const filteredKiosk = listKiosks.filter(
          (kiosk) => kiosk.id !== data.id
        );
        setFilter(filteredKiosk);
        setOpenModal({ open: false, id: "" });
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <>
      <Header />
      <Container>
        <div className="flex items-center justify-end gap-2.5 my-5 px-4">
          <Filter onClick={handleSearch} />
          <Button onClick={() => handleButtonFilters("all")}>All</Button>
          <Button onClick={() => handleButtonFilters(false)}>Closed</Button>
          <Button onClick={() => handleButtonFilters(true)}>Open</Button>
        </div>
        {filteredKiosks.length || listKiosks.length ? (
          <Table
            setOpenModal={setOpenModal}
            tag="kiosks"
            th={Object.keys(
              filteredKiosks.length ? filteredKiosks[0] : listKiosks[0]
            )}
            td={filteredKiosks.length ? filteredKiosks : listKiosks}
          />
        ) : (
          <div className="flex items-center flex-col gap-4">
            <Heading>No kiosk registered yet</Heading>
            <Button onClick={() => navigate("/kiosk")}>Create new kiosk</Button>
          </div>
        )}
      </Container>
      {openModal?.open ? (
        <Modal title="Delete Kiosk">
          <Formik initialValues={{}} onSubmit={() => handleDelete(openModal)}>
            <Form>
              <div className="relative p-6 flex-auto">
                <p className="text-primary font-bold text-lg mt-0 mb-2 font-sans">
                  Are you sure you want to delete the Kiosk ID {openModal.id}?
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
                <button
                  onClick={() => setOpenModal({ open: false, id: "" })}
                  className="bg-transparent text-primary font-semibold py-2 px-4 border border-primary rounded-full"
                >
                  Cancel
                </button>
                <Button type="submit">Confirm</Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};
