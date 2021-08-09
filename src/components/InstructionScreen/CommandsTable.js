import React from "react";

const CommandsTable = ({ cols, rows }) => {
  return (
    <table className="table table-bordered">
      <thead className="shadow text-center">
        <tr>
          {cols.map((col, id) => (
            <th className="text-capitalize" scope="col" key={id}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center text-capitalize">
        {rows.map((data, id) => (
          <tr key={id}>
            <td>
              {data.commands.length > 1 ? (
                data.commands.map((cmd, i) => (
                  <p
                    key={i}
                    className="text-center small bg-dark text-white py-1 px-2 my-2"
                  >
                    {cmd}
                  </p>
                ))
              ) : (
                <p className="text-center small bg-dark text-white py-1 px-2">
                  {data.commands[0]}
                </p>
              )}
            </td>
            <td>
              <p dangerouslySetInnerHTML={{ __html: data.info }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommandsTable;
