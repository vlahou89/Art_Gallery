import React, { useEffect } from "react";
import "./tailwind.scss";

import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

// components
import AdminToolbar from "./components/AdminToolbar";

// hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// pages
import Homepage from "./pages/Homepage";
import Shop from "./pages/Shop";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Order from "./pages/Order";
import "./default.scss";
import ContactForm from "./components/ContactForm";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/shop"
          render={() => (
            <MainLayout>
              <Shop />
            </MainLayout>
          )}
        />
        <Route
          path="/shop/:filterType"
          render={() => (
            <MainLayout>
              <Shop />
            </MainLayout>
          )}
        />
        <Route
          path="/product/:productID"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        />
        <Route
          path="/contact"
          render={() => (
            <HomepageLayout>
              <ContactForm />
            </HomepageLayout>
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}
        />
        <Route
          path="/payment"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Payment />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <HomepageLayout>
              <Registration />
            </HomepageLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <HomepageLayout>
              <Login />
            </HomepageLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <HomepageLayout>
              <Recovery />
            </HomepageLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/order/:orderID"
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
