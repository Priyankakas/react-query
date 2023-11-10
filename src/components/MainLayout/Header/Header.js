import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {

  const headerItems = [
    {
      to: "/home",
      name: "Home",
    },
    // {
    //   to: "/users",
    //   name: "Users",
    // },
    {
      to: "/hobbies",
      name:"Hobbies",
    },
    {
      to: "/rqusers",
      name: "RQUsers"
    },
  ]


  return (
    <div className="d-flex justify-content-around" style={{backgroundColor: "#addada", height: 35}}>
       {headerItems.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink
                    to={item.to}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                      };
                    }}
                  >
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
    </div>
  );
};
