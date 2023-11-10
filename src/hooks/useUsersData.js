import { useQuery, useMutation, useQueryClient } from "react-query";
import { callApi } from "../services/axiosTemplate";

const fetchUsers = () => {
  // return axios.get("http://localhost:4000/users");

  return callApi({ url: "/users" });
};

/* #region // fetch/get User  */
export const useUsersData = (onSuccess, onError) => {
  return useQuery("users", fetchUsers, {
    // cacheTime: 5000, // default time is 5 min        query cache
    // staleTime: 30000, // default is 0. Time for which old cached data will be seen and no refetching done
    // in background after 30s it will be done for new data. newtwork request can be reduced with this

    refetchOnMount: true, // default true on every mount api is fetched and called
    refetchOnWindowFocus: true, // default true whenever window lose and gain focus api is refetched

    // refetchInterval: 5000, // default is false  every 5s api will be refetched but will not refetch if window lose focus
    refetchIntervalInBackground: true, // it will refetch in bg when window lose focus

    //   enabled: false // dont fetch on mount fetch on click of button

    onSuccess,
    onError,

    /* #region  data transforamtion to required only names. use this below in render */
    //   select: (data) => {
    //     const userNames = data.data.map((user) => user.name);
    //     return userNames;
    //   },
    /* #endregion */
  });
};
/* #endregion */

/* #region  add User */
const addUser = (user) => {
  // return axios.post("http://localhost:4000/users", user);
  return callApi({ url: "/users", method: "post", data: user });
};
export const useAddUserData = () => {
  const queryClient = useQueryClient();

  return useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users"); // refetch users after add operation

      // alternate way instead of above for refetching to avoid get api call again but add api should return response object then

      // queryClient.setQueryData("users", (oldQuerydata)=>{
      //   return {
      //     ...oldQuerydata,
      //     data: [...oldQuerydata.data, data.data]      // data.data is mutation add response and oldquery data is previous stored data
      //   }
      // })
    },
  });
};
/* #endregion */

/* #region  Delete User */
const deleteUser = (id) => {
  return callApi({ url: `/users/${id}`, method: "delete" });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users"); // refetch users after delete operation
    },
  });
};
/* #endregion */

/* #region  Edit User */
const editUser = (user) => {
  return callApi({ url: `/users/${user.id}`, method: "put", data: user });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users"); // refetch users after Edit operation
    },
  });
};
/* #endregion */

/* #region  Pagination */
const fetchHobbies = (pageNumber) => {
  // return axios.get(
  //   `http://localhost:4000/hobbies?_limit=2&_page=${pageNumber}`
  // );

  return callApi({
    url: "/hobbies",
    params: {
      _limit: 2,
      _page: pageNumber,
    },
  });
};

export const useHobbiesData = (onSuccess, onError, pageNumber) => {
  return useQuery(["hobbies", pageNumber], () => fetchHobbies(pageNumber), {
    onSuccess,
    onError,
  });
};
/* #endregion */
