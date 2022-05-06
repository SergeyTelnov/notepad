import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  if (!currentUser) return "Loading...";
  return (
    <>
      <div className="text-light me-2 ms-2 d-flex align-items-center">
        <span>{currentUser.name}</span>
      </div>
      <Link className="btn btn-light btn-sm" title="Выход" to="/logout">
        <i className="bi bi-box-arrow-right"></i>
      </Link>
    </>
  );
};

export default NavProfile;
