import React from "react";
import { useUserDataById } from "../../hooks/useUserDataById";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const RQUserDetails = () => {
  const params = useParams();
  const userId = params.rquserId;

  /* #region  success and error callbacks */
  const onSuccess = (data) => {
    console.log("success", data);
  };

  const onError = (error) => {
    console.log("error", error);
  };
  /* #endregion */

  console.log("userId", userId);

  const { isLoading, isFetching, isError, error, data } = useUserDataById(
    onSuccess,
    onError,
    userId
  );
  // console.log("data", data?.data);

  return (
    <div className="py-4">
      {(isLoading || isFetching) && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isError && <h2>{error.message}</h2>}
      <div>
        <span>{data?.data.name}</span>
        <span className="px-3">{data?.data.email}</span>
      </div>
         
    </div>
  );
};
