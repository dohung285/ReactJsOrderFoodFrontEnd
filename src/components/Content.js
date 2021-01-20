import React from "react";
import { Route, Switch } from "react-router-dom";
import router from "../router";

const Content = () => {
  function showContent(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }

  return (
    <div>
      <section>
        <Switch>{showContent(router)}</Switch>
      </section>
    </div>
  );
};

export default Content;
