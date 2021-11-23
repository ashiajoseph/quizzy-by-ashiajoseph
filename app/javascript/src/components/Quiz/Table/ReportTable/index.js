import React, { useMemo } from "react";

import { UpArrow, DownArrow } from "@bigbinary/neeto-icons";
import { Toastr } from "@bigbinary/neetoui/v2";
import { useTable, useSortBy } from "react-table";

import { COLS } from "./tableheader";

const ReportTable = ({ reportData, show }) => {
  const cols = useMemo(() => COLS, []);
  const data = useMemo(() => reportData, []);
  const reportSize = reportData.length != 0;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: cols, data: data }, useSortBy);

  if (show && !reportSize) {
    Toastr.info("No participant has attempted any quiz");
  }

  return (
    <>
      {show && reportSize && (
        <table
          {...getTableProps()}
          className="w-89 py-12 mx-auto my-12 rounded-md bg-black bg-opacity-70 tracking-wider  "
        >
          <thead className="text-xl text-gray-100 ">
            {headerGroups.map((headerGroup, ind) => (
              <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, ind) => (
                  <th
                    key={ind}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-4 px-5"
                  >
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <DownArrow className="inline text-lime" />
                      ) : (
                        <UpArrow className="inline text-lime" />
                      )
                    ) : (
                      " "
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, ind) => {
              prepareRow(row);
              const bgColor = ind % 2 == 0 ? "bg-gray-300" : "bg-gray-100";
              return (
                <tr key={ind} {...row.getRowProps()} className="text-lg ">
                  {row.cells.map((cell, ind) => {
                    return (
                      <td
                        key={ind}
                        {...cell.getCellProps()}
                        className={`pl-12 pr-4 py-6 break-all ${bgColor}`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ReportTable;
