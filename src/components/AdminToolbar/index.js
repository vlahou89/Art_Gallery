import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkUserIsAdmin } from "../../Utils";
import "./styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AdminToolbar = (props) => {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div data-selector="adminToolbar" className="adminToolbar">
      <ul>
        <li>
          <Link data-selector="manageContent" to="/admin">Manage Content</Link>
        </li>
        <li>
          <Link data-selector="staffDetails" to="/staff">Staff Details</Link>
        </li>
        <li>
          <Link data-selector="artistDetails" to="/artists">Artist Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
