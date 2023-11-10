// dynamic parallel queries
import axios from "axios";
import React from "react";
import { useQueries } from "react-query";
import { CustomTable } from "../CustomUIComponents/CustomTable";

const fetchUsersDetails = (userId) => {
  return axios.get(`http://localhost:4000/users/${userId}`);
};

export const RQGetAllUsersDetails = ({ userIds }) => {
  console.log("userIds", userIds);
  const queryResults = useQueries(
    userIds?.map((id) => {
      return {
        queryKey: id,
        queryFn: () => fetchUsersDetails(id),
      };
    })
  );
  console.log("queryResults", queryResults);

  const getAllUsersDetails = (queryResult) => {
    const headers = ["Id", "Name", "Age", "Email"];
    const columns = queryResult.map((queryResult) => {
      return (
        <tr key={queryResult?.data?.data.id}>
          <th>{queryResult?.data?.data.id}</th>
          <th>{queryResult?.data?.data.name}</th>
          <th>{queryResult?.data?.data.age}</th>
          <th>{queryResult?.data?.data.email}</th>
        </tr>
      );
    });

    return <CustomTable headers={headers} columns={columns} />;
  };

  return (
    <div className="py-4">
        {getAllUsersDetails(queryResults)}
    </div>
  );
};
