import React from "react";
import Table from "react-bootstrap/Table";

export const CustomTable = (props) => {
  return (
    <div className="col-8 offset-2">
      <Table  striped bordered hover>
        <thead>
          <tr>
            {props?.headers?.map((headerName) => {
              return <th>{headerName}</th>;
            })}
          </tr>
        </thead>
        <tbody>{props?.columns}</tbody>
      </Table>
    </div>
  );
};
