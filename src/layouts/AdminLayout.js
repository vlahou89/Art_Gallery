import React from "react";

import { useDispatch } from "react-redux";

import Header from "./../components/Header";

const AdminLayout = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="adminLayout">
      <Header {...props} />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
