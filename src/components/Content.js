import React from "react";
import { Route, Switch } from "react-router-dom";
import { Bread } from "../pages/banhmi/Bread";
import FoodDetail from "../pages/chitietmonan/FoodDetail";
import Catalog from "../pages/danhmuc/Catalog";


import Home from "../pages/Home";
import User from "../pages/nguoidung/User";
import NotFound from "../pages/NotFound";
import Role from "../pages/vaitro/Role";
import { PrivateRoute } from "../utils/PrivateRoute";

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
        <Switch>
          {/* {showContent(router)} */}
          <PrivateRoute roles={['RealmAdmin']} path="/user" component={User} />
          <PrivateRoute roles={['RealmAdmin']} component={Role} path="/role" exact />

          <Route component={Home} path="/" exact />
          <Route component={Home} path="/home" exact />


          <Route component={Bread} path="/bread" exact />
          <Route component={Catalog} path="/catalog/:id"  />

          <Route component={FoodDetail} path="/food/:id"  />
          {/* <Route component={User} path="/nguoi-dung" exact />
          <Route component={User} path="/nguoi-dung" exact />
          <Route component={User} path="/nguoi-dung" exact /> */}





          <Route component={NotFound} />

        </Switch>
      </section>
    </div>
  );
};

export default Content;
