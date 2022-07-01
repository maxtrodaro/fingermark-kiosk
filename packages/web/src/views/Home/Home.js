import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { Button, Heading, Header, Table, Container } from "@maxtrodaro/common";

import { kiosksFilterState } from "../../recoil/atoms/kiosks";
import { kiosksMap } from "../../recoil/selectors/kiosks";

export const HomePage = () => {
  const [_, setFilter] = useRecoilState(kiosksMap);
  const listKiosks = useRecoilValue(kiosksMap);
  const filteredKiosks = useRecoilValue(kiosksFilterState);

  const handleFilter = async (state) => {
    const filteredKiosk =
      state === "all"
        ? listKiosks
        : listKiosks.filter((item) => item.isKioskClosed === state);

    setFilter(filteredKiosk);
  };

  console.log("filteredKiosks1234", filteredKiosks);
  console.log("listKiosks1234", listKiosks);

  return (
    <>
      <Header />
      <Container>
        <div className="flex items-center justify-end gap-2.5 my-5">
          <Button onClick={() => handleFilter("all")}>All</Button>
          <Button onClick={() => handleFilter(false)}>Closed</Button>
          <Button onClick={() => handleFilter(true)}>Open</Button>
        </div>
        <Table
          th={Object.keys(filteredKiosks ? filteredKiosks[0] : listKiosks[0])}
          td={filteredKiosks || listKiosks}
        />
      </Container>
    </>
  );
};
