import React, { useMemo } from "react";

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
    <table {...getTableProps()} className="w-3/4 mx-auto border-solid	border-2	">
      <thead className="text-xl">
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
          return (
            <tr key={ind} {...row.getRowProps()} className="text-lg =">
              {row.cells.map((cell, ind) => {
                return (
                  <td key={ind} {...cell.getCellProps()} className="p-3 ">
                    {cell.render("Cell")}
                  </td>
                );
              })}
              <td key="edit" className="p-3 ">
                Edit
              </td>
              <td key="del" className="p-3 ">
                Delete
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
