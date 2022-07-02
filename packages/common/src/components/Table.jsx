import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import EditImage from "../assets/img/edit.png";
import DeleteImage from "../assets/img/delete.png";
import LogImage from "../assets/img/log.png";

const Table = (props) => {
  const navigate = useNavigate();

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {props?.th.map((item, index) => (
            <th
              key={index}
              className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center"
            >
              {item}
            </th>
          ))}
          {props.tag == "kiosks" ? (
            <>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Log
              </th>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Editar
              </th>
              <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-primary text-center">
                Excluir
              </th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody className="bg-white">
        {props?.td.map((item) => (
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
            {props.tag == "kiosks" ? (
              <>
                <td
                  className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer"
                  onClick={() => navigate(`/log/${item.id}`)}
                >
                  <img
                    className="block m-auto"
                    alt="Imagem de log"
                    src={LogImage}
                  />
                </td>
                <td className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer">
                  <img
                    className="block m-auto"
                    alt="Imagem de editar"
                    src={EditImage}
                  />
                </td>
                <td
                  className="border-b border-slate-100 p-4 pl-8 text-black text-center cursor-pointer"
                  onClick={() =>
                    props.setOpenModal({ open: true, id: item.id })
                  }
                >
                  <img
                    className="block m-auto"
                    alt="Imagem de deletar"
                    src={DeleteImage}
                  />
                </td>
              </>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
