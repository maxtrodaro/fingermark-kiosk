import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useRecoilCallback } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
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
import { userSession } from "../../hooks/userSession";

export const LogPage = () => {
  const [filterEmpty, setFilterEmpty] = useState(false);
  const [_, setFilter] = useRecoilState(logsMap);
  const listLogs = useRecoilValue(logsMap);
  const filteredLogs = useRecoilValue(logsFilterState);
  const navigate = useNavigate();
  const { handleSignout } = userSession();
  const { kioskId } = useParams();
  const refreshLogList = useRecoilCallback(({ refresh }) => () =>
    refresh(logsMap)
  );

  const handleSearch = (data) => {
    const filteredLog = listLogs.filter(
      (log) =>
        log.action.includes(data.search) ||
        log.kioskId.includes(data.search) ||
        log.userId.includes(data.search)
    );

    setFilter(filteredLog);
  };

  useEffect(() => {
    if (!kioskId) return;

    const filterLog = listLogs.filter(
      (log) => log.kioskId === `kioskId ${kioskId}`
    );
    if (filterLog.length) {
      setFilter(filterLog);
      setFilterEmpty(false);
    } else {
      setFilterEmpty(true);
    }
  }, [kioskId, setFilterEmpty, listLogs]);

  useEffect(() => {
    refreshLogList();
  }, [kioskId]);

  return (
    <>
      <Header handleSignout={handleSignout} />
      <Container className="my-6">
        <div className="flex items-center justify-end gap-2.5 my-5 px-4">
          <Filter onClick={handleSearch} />
          <Button
            onClick={() => {
              setFilter(listLogs);
              setFilterEmpty(false);
            }}
          >
            All
          </Button>
        </div>
        {!filterEmpty ? (
          filteredLogs.length || listLogs.length ? (
            <Table
              tag="logs"
              values={filteredLogs.length ? filteredLogs : listLogs}
            />
          ) : (
            <div className="flex items-center flex-col gap-4">
              <Heading>No log registered yet</Heading>
              <Button onClick={() => navigate("/home")}>Back to home</Button>
            </div>
          )
        ) : (
          <div className="flex items-center flex-col gap-4">
            <Heading>No log found with this filter</Heading>
            <Button
              onClick={() => {
                navigate("/log");
                setFilterEmpty(false);
              }}
            >
              Back to logs
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};
