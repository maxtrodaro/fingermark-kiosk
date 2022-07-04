import moment from "moment";

export function formatOpenHour(listKiosks) {
  const time = moment();
  return listKiosks.map((kiosk) => {
    const beforeTime = moment(kiosk.storeOpensAt, "HH:mm").valueOf();
    const afterTime = moment(kiosk.storeClosesAt, "HH:mm").valueOf();
    if (time.isBetween(beforeTime, afterTime) && !kiosk.isKioskClosed) {
      return {
        ...kiosk,
        isOpenNow: true,
      };
    } else {
      return {
        ...kiosk,
        isOpenNow: false,
      };
    }
  });
}
