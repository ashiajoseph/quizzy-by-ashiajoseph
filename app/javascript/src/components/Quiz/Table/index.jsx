import React, { useMemo } from "react";

import { Delete, Edit } from "@bigbinary/neeto-icons";
import Logger from "js-logger";
import { useTable } from "react-table";

import { COLS } from "./tableHeader";

const Table = ({ quizlist }) => {
  const cols = useMemo(() => COLS, []);
  const data = useMemo(() => quizlist, []);
  const tableInstance = useTable({ columns: cols, data: data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  Logger.info(quizlist);
  return (
    <table
      {...getTableProps()}
      className="w-70 py-10 mx-auto my-10 rounded-xl bg-black bg-opacity-70 tracking-wider  "
    >
      <thead className="text-2xl text-gray-100 ">
        {headerGroups.map((headerGroup, ind) => (
          <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, ind) => (
              <th key={ind} {...column.getHeaderProps()} className="p-3 ">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, ind) => {
          prepareRow(row);
          const bgColor = ind % 2 == 0 ? "bg-gray-300" : " bg-gray-100";
          return (
            <tr key={ind} {...row.getRowProps()} className="text-lg ">
              {row.cells.map((cell, ind) => {
                return (
                  <td
                    key={ind}
                    {...cell.getCellProps()}
                    className={`py-4 pr-3 pl-8  capitalize	${bgColor}`}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
              <td key="edit" className={`px-3 py-4 text-center ${bgColor}`}>
                <Edit size={30} className="mx-auto" />
              </td>
              <td key="del" className={`p-3 py-4 text-center ${bgColor}`}>
                <Delete size={28} className="mx-auto neeto-ui-text-error" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
