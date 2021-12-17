import React from "react";
import { Route, Redirect } from "react-router-dom";

import { userService } from "@/_services";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = userService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && !currentUser.roles.some((r) => roles.includes(r))) {
        // role not authorized so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
