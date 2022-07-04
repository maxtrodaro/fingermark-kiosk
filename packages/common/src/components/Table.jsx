import React from "react";
import { useNavigate } from "react-router-dom";

import EditImage from "../assets/img/edit.png";
import DeleteImage from "../assets/img/delete.png";
import LogImage from "../assets/img/log.png";

const Table = ({ values, tag, setOpenModal }) => {
  const navigate = useNavigate();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {Object.keys(values[0]).map((item, index) => (
            <th
              key={index}
              className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center"
            >
              {item}
            </th>
          ))}
          {tag == "kiosks" && (
            <>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Log
              </th>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Edit
              </th>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Delete
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="bg-white">
        {tag == "kiosks"
          ? values.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.serialKey}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.description}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.isKioskClosed.toString()}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.storeOpensAt}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.storeClosesAt}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.id}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.isOpenNow.toString()}
                </td>
                <td
                  className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer"
                  onClick={() => navigate(`/log/${item.id}`)}
                >
                  <img
                    className="block m-auto"
                    alt="Log Image"
                    src={LogImage}
                  />
                </td>
                <td
                  className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer"
                  onClick={() => navigate(`/kiosk/${item.id}`)}
                >
                  <img
                    className="block m-auto"
                    alt="Edit Image"
                    src={EditImage}
                  />
                </td>
                <td
                  className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer"
                  onClick={() => setOpenModal({ open: true, id: item.id })}
                >
                  <img
                    className="block m-auto"
                    alt="Delete Image"
                    src={DeleteImage}
                  />
                </td>
              </tr>
            ))
          : values.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.action}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.description}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.kioskId}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.userId}
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center">
                  {item.id}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
