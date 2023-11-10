import React, { useState } from "react";
import { CustomTable } from "./CustomUIComponents/CustomTable";
import { useHobbiesData } from "../hooks/useUsersData";
import { Button, Spinner } from "react-bootstrap";

export const Hobbies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const totalRecords = 6;
  const limit = 2;
  const totalPages = totalRecords / limit;

  const onSuccessHobby = (data) => {
    console.log("success", data);
  };

  const onErrorHobby = (error) => {
    console.log("error", error);
  };

  const { isLoading: isLoadingHobby, data: hobbies } = useHobbiesData(
    onSuccessHobby,
    onErrorHobby,
    pageNumber
  );
  // hobbies
  // alias name used for parallel queries
  const getHobbies = (hobbies) => {
    const headers = ["Hobby", "Level"];
    const columns = hobbies?.data.map((hobby) => {
      return (
        <tr key={hobby.id}>
          <th>{hobby.hobby}</th>
          <th>{hobby.level}</th>
        </tr>
      );
    });
    return <CustomTable headers={headers} columns={columns} />;
  };

  return (
    <div>
      <div className="pt-3">
        <h3>Hobbies</h3>
        {isLoadingHobby && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {getHobbies(hobbies)}

        <Button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber == 1}
        >
          Prev Page
        </Button>
        <Button
          className="mx-2"
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber == totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};
