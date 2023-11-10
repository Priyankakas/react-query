import axios from "axios";
import { useQuery } from "react-query";

const fetchUsersById = (userId) => {
  return axios.get(`http://localhost:4000/users/${userId}`);
};

const fetchUserInterestById = (interestId) => {
  return axios.get(`http://localhost:4000/interests/${interestId}`);
};

export const useUserDataById = (onSuccess, onError, userId) => {
  return useQuery(["userById", userId], () => fetchUsersById(userId), {
    onSuccess,
    onError,
  });
};


// Dependent Query on Users
export const useUserInterestById = (interestId) => {
  return useQuery(
    ["user-interest", interestId],
    () => fetchUserInterestById(interestId),
    {
      enabled: !!interestId   // fetch interests after users data
    }
  );
};
