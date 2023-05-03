import React, { ReactNode } from "react";

type TableProps<T> = {
  tableData: T[];
  tableColumns: string[];
  tableRenderRow: (item?: T) => ReactNode;
};

const Table = <T,>({
  tableData,
  tableColumns,
  tableRenderRow,
}: TableProps<T>) => {
  return (
    <table className="w-full">
      <thead className="text-left">
        <tr className="h-14 text-sm text-neutral-700 dark:text-neutral-300">
          {tableColumns.map((name, index) => (
            <th className="font-normal" key={index}>
              {name}
              <button className="info-button text-indigo-700 dark:text-indigo-300 ms-1">
                i
                <div className="info-box">
                  This is a test information box about the table columns logic.
                </div>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.length > 0 ? (
          tableData.map((data, index) => (
            <tr
              className="h-14 border-t border-neutral-600 dark:border-neutral-400"
              key={index}
            >
              {tableRenderRow(data)}
            </tr>
          ))
        ) : (
          <tr className="h-14 border-t border-neutral-600 dark:border-neutral-400 text-center">
            {tableRenderRow()}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
