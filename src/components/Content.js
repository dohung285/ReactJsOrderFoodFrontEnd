
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Bread } from "../pages/banhmi/Bread";
import Report from "../pages/baocao/Report";
import FoodDetail from "../pages/chitietmonan/FoodDetail";
import Rating from "../pages/danhgia/Rating";
import Catalog from "../pages/danhmuc/Catalog";
import OrderCard from "../pages/dathang/OrderCard";
import ListOrder from "../pages/donhang/ListOrder";
import Order from "../pages/donhang/Order";
import TimeLineOrder from "../pages/donhang/TimeLineOrder";
import Discount from "../pages/giamgia/Discount";
import Card from "../pages/giohang/Card";
import About from "../pages/gioithieu/About";


import Home from "../pages/Home";
import Contact from "../pages/lienhe/Contact";
import Food from "../pages/monan/Food";
import Account from "../pages/nguoidung/Account";
import User from "../pages/nguoidung/User";
import UserInfor from "../pages/nguoidung/UserInfor";
import FoodGroup from "../pages/nhommonan/FoodGroup";
import NotFound from "../pages/NotFound";
import ChangePassword from "../pages/thaydoimatkhau/ChangePassword";
import Role from "../pages/vaitro/Role";
import RoleNew from "../pages/vaitro/RoleNew";
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
          <PrivateRoute roles={['admin']} path="/user" component={Account} />
          <PrivateRoute roles={['admin']} component={RoleNew} path="/role" exact />

          <Route component={Home} path="/" exact />
          <Route component={Home} path="/home" exact />

          <Route component={Bread} path="/bread" exact />
          <Route component={Catalog} path="/catalog/:id"   />

          <Route component={FoodDetail} path="/food/:id"  />
           {/* <Route component={Card} path="/card/:username" exact /> */}
           <Route component={Card} path="/card" exact />

           <Route component={ChangePassword} path="/change-password" exact />
           <Route component={ListOrder} path="/list-order" exact />
           <Route component={TimeLineOrder} path="/time-line/:id" exact />

           <Route component={UserInfor} path="/user-infor" exact />

           <PrivateRoute roles={['admin']} component={Food} path="/food" exact />
           <PrivateRoute roles={['admin']} component={FoodGroup} path="/food-group" exact />
           <PrivateRoute roles={['admin']} component={Rating} path="/rating" exact />
           <PrivateRoute roles={['admin']} component={Discount} path="/discount" exact />
           <PrivateRoute roles={['admin']} component={Report} path="/report" exact />
           <PrivateRoute roles={['admin']} component={Order} path="/order" exact />

           <Route component={About} path="/about" exact />
           <Route component={Contact} path="/contact" exact />


          <Route component={NotFound} />

        </Switch>
      </section>
    </div>
  );
};

export default Content;
