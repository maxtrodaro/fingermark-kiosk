import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Header,
  Table,
  Container,
  Filter,
  Heading,
} from "@maxtrodaro/common";

import { logsFilterState } from "../../recoil/atoms/logs";
import { logsMap } from "../../recoil/selectors/logs";
import api from "../../services/api";
import { userSession } from "../../hooks/userSession";

export const LogPage = () => {
  const [_, setFilter] = useRecoilState(logsMap);
  const listLogs = useRecoilValue(logsMap);
  const filteredLogs = useRecoilValue(logsFilterState);
  const navigate = useNavigate();
  const { handleSignout } = userSession();

  const handleSearch = () => {
    const value = document.getElementById("search").value;

    const filteredLog = listLogs.filter(
      (log) =>
        log.action.includes(value) ||
        log.kioskId.includes(value) ||
        log.userId.includes(value)
    );

    document.getElementById("search").value = "";

    setFilter(filteredLog);
  };

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Container>
        <div className="flex items-center justify-end gap-2.5 my-5 px-4">
          <Filter onClick={handleSearch} />
          <Button onClick={() => setFilter(listLogs)}>All</Button>
        </div>
        {filteredLogs.length || listLogs.length ? (
          <Table
            tag="logs"
            th={Object.keys(
              filteredLogs.length ? filteredLogs[0] : listLogs[0]
            )}
            td={filteredLogs.length ? filteredLogs : listLogs}
          />
        ) : (
          <div className="flex items-center flex-col gap-4">
            <Heading>No log registered yet</Heading>
            <Button onClick={() => navigate("/home")}>Back to home</Button>
          </div>
        )}
      </Container>
    </>
  );
};
