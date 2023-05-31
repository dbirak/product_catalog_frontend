import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = (props) => {
  if (
    props.role === "company" &&
    localStorage.getItem("role") === "company" &&
    localStorage.getItem("token")
  )
    return <Outlet />;
  else if (
    props.role === "user" &&
    localStorage.getItem("role") === "user" &&
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
    return <Navigate to="/" />;
  }
};

export default ProtectRoute;
