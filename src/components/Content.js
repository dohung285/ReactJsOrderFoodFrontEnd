import { Rating } from "@material-ui/lab";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Bread } from "../pages/banhmi/Bread";
import Report from "../pages/baocao/Report";
import FoodDetail from "../pages/chitietmonan/FoodDetail";
import Catalog from "../pages/danhmuc/Catalog";
import OrderCard from "../pages/dathang/OrderCard";
import Order from "../pages/donhang/Order";
import Discount from "../pages/giamgia/Discount";
import Card from "../pages/giohang/Card";


import Home from "../pages/Home";
import Food from "../pages/monan/Food";
import User from "../pages/nguoidung/User";
import FoodGroup from "../pages/nhommonan/FoodGroup";
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
           <Route component={Card} path="/card/:username" exact />

           <Route component={Food} path="/food" exact />
           <Route component={FoodGroup} path="/food-group" exact />
           <Route component={Report} path="/rating" exact />
           <Route component={Discount} path="/discount" exact />
           <Route component={Report} path="/report" exact />
           <Route component={Order} path="/order" exact />


          <Route component={NotFound} />

        </Switch>
      </section>
    </div>
  );
};

export default Content;
