import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
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
import { logsMap, logsMapFamily } from "../../recoil/selectors/logs";
import api from "../../services/api";
import { userSession } from "../../hooks/userSession";
import { formatLogHelper } from "../../utils/formatLogHelper";
import { formatOpenHour } from "../../utils/formatOpenHour";

export const HomePage = () => {
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const [_, setFilter] = useRecoilState(kiosksMap);
  const listKiosks = useRecoilValue(kiosksMap);
  const filteredKiosks = useRecoilValue(kiosksFilterState);
  const listLogs = useRecoilValue(logsMap);
  const navigate = useNavigate();
  const { handleSignout } = userSession();
  const { search } = useLocation();
  const refreshKioskList = useRecoilCallback(({ refresh }) => () =>
    refresh(kiosksMap)
  );
  const createLog = useRecoilCallback(({ snapshot }) => (logData) =>
    snapshot.getPromise(logsMapFamily(logData))
  );
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

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

  const handleDelete = async (values) => {
    await api
      .delete(`/kiosk/${values.id}`)
      .then(() => {
        const logData = formatLogHelper(
          "Delete Kiosk",
          `The user ID ${userId} delete the kiosk ID ${values.id}`,
          values.id,
          userId,
          parseInt(listLogs.slice(-1)[0].id) + 1
        );
        createLog(logData).then((data) => {
          if (data.status !== 201) console.error("err", data.statusText);

          const filteredKiosk = listKiosks.filter(
            (kiosk) => kiosk.id !== values.id
          );
          setFilter(filteredKiosk);
          setOpenModal({ open: false, id: "" });
          alert(`Kiosk ID ${values.id} Deleted Succesfully`);
        });
      })
      .catch((err) => console.error("err", err));
  };

  useEffect(() => {
    search.indexOf("update") !== -1 && refreshKioskList();
  }, [search]);

  return (
    <>
      <Header handleSignout={handleSignout} />
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
            values={
              filteredKiosks.length
                ? formatOpenHour(filteredKiosks)
                : formatOpenHour(listKiosks)
            }
          />
        ) : (
          <div className="flex items-center flex-col gap-4">
            <Heading>No kiosk registered yet</Heading>
            <Button onClick={() => navigate("/kiosk")}>Create new kiosk</Button>
          </div>
        )}
      </Container>
      {openModal?.open ? (
        <Modal
          title="Delete Kiosk"
          initialValues={{}}
          onSubmit={() => handleDelete(openModal)}
          bodyText={`Are you sure you want to delete the Kiosk ID ${openModal.id}?`}
        >
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
            <button
              onClick={() => setOpenModal({ open: false, id: "" })}
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
