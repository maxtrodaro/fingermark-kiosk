import React from "react";

import Button from "./Button";

const Table = (props) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {props?.th.map((item, index) => (
            <th
              key={index}
              className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-left"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {props?.td.map((item) => (
          <tr key={item.id}>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.serialKey}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.description}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.isKioskClosed.toString()}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.storeOpensAt}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.storeClosesAt}
            </td>
            <td className="border-b border-slate-100 p-4 pl-8 text-black">
              {item.id}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
