import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = (props) => {
  if (
    props.role === "admin" &&
    localStorage.getItem("role") === "admin" &&
    localStorage.getItem("token")
  )
    return <Outlet />;
  else if (
    props.role === "null" &&
    !localStorage.getItem("role") &&
    !localStorage.getItem("token")
  )
    return <Outlet />;
  else if (props.role !== localStorage.getItem("role"));
  {
    //localStorage.clear();
    if (localStorage.getItem("role") === "admin")
      return <Navigate to="/admin/category" />;
    else return <Navigate to="/" />;
  }
};

export default ProtectRoute;
