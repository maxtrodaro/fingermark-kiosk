import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { Button, Header, Table, Container, Filter } from "@maxtrodaro/common";

import { kiosksFilterState } from "../../recoil/atoms/kiosks";
import { kiosksMap } from "../../recoil/selectors/kiosks";

export const HomePage = () => {
  const [_, setFilter] = useRecoilState(kiosksMap);
  const listKiosks = useRecoilValue(kiosksMap);
  const filteredKiosks = useRecoilValue(kiosksFilterState);

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
        <Table
          tag="kiosks"
          th={Object.keys(filteredKiosks ? filteredKiosks[0] : listKiosks[0])}
          td={filteredKiosks || listKiosks}
        />
      </Container>
    </>
  );
};
