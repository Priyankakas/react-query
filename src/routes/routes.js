import { useRoutes } from "react-router-dom";
import { Homepage } from "../components/Homepage";
import { RQUsers } from "../components/RQUsers/RQUsers";
import { Users } from "../components/Users";
import { MainLayout } from "../components/MainLayout/MainLayout";
import { RQUserDetails } from "../components/RQUsers/RQUserDetails";
import { RQGetAllUsersDetails } from "../components/RQUsers/RQGetAllUsersDetails";
import { Hobbies } from './../components/Hobbies';

export default function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
            path: "home",
            element: <Homepage/>
        },
        {
            path: "users",
            element: <Users />,
        },
        {
          path: "hobbies",
          element: <Hobbies/>
        },
        {
            path: "rqusers",
            element: <RQUsers />,
        },
        {
            path: "rqusers/:rquserId",
            element: <RQUserDetails/>
        },
        {
          path: "rqusers/rqusersDetails",
          element: <RQGetAllUsersDetails userIds={[1, 3]}/>
        }
      ]
    },
    
  ]);
  return element;
}
