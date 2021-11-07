import React, { useState, useMemo, useRef } from "react";

import { Delete, Edit, UpArrow, DownArrow } from "@bigbinary/neeto-icons";
import { Tooltip } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy } from "react-table";

import quizzesApi from "apis/quizzes";

import { COLS } from "./tableHeader";

import DeleteAlert from "../DeleteAlert";

const Table = ({ quizList, setQuizList }) => {
  let history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const cols = useMemo(() => COLS, []);
  const data = useMemo(() => quizList, [quizList]);
  const deletionData = useRef({ slug: "", title: "" });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: cols, data: data }, useSortBy);

  const editQuiz = slug => {
    history.push(`/quiz/${slug}/edit`);
  };

  const deleteQuiz = async slugg => {
    try {
      await quizzesApi.destroy(slugg);
      setQuizList(prevlist => prevlist.filter(({ slug }) => slug !== slugg));
    } catch (error) {
      logger.error(error);
    } finally {
      setShowAlert(false);
    }
  };
  const showPrompt = (slug, title) => {
    deletionData.current.slug = slug;
    deletionData.current.title = title;
    setShowAlert(true);
  };

  return (
    <>
      <table
        {...getTableProps()}
        className="w-70 py-10 mx-auto my-10 rounded-xl bg-black bg-opacity-70 tracking-wider  "
      >
        <thead className="text-2xl text-gray-100 ">
          {headerGroups.map((headerGroup, ind) => (
            <tr key={ind} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, ind) => (
                <th
                  key={ind}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-3 "
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
            const bgColor = ind % 2 == 0 ? "bg-gray-300" : " bg-gray-100";
            return (
              <tr key={ind} {...row.getRowProps()} className="text-lg ">
                {row.cells.map((cell, ind) => {
                  return (
                    <td
                      key={ind}
                      {...cell.getCellProps()}
                      className={`py-4 pr-5 pl-8  capitalize break-all ${bgColor}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td key="edit" className={`py-4 w-20 text-center ${bgColor}`}>
                  <Tooltip position="right-end" content="Edit">
                    <button
                      className="focus:outline-none "
                      onClick={() => editQuiz(row.original.slug)}
                    >
                      <Edit size={30} className="mx-auto" />
                    </button>
                  </Tooltip>
                </td>
                <td key="del" className={` py-4 w-28 text-center ${bgColor}`}>
                  <Tooltip position="right-end" content="Delete">
                    <button
                      className="focus:outline-none "
                      onClick={() =>
                        showPrompt(row.original.slug, row.original.title)
                      }
                    >
                      <Delete
                        size={28}
                        className="mx-auto neeto-ui-text-error "
                      />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showAlert && (
        <DeleteAlert
          slug={deletionData.current.slug}
          title={deletionData.current.title}
          showAlert
          setShowAlert={setShowAlert}
          deleteQuiz={deleteQuiz}
        />
      )}
    </>
  );
};

export default Table;
