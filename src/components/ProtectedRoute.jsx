import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, allowedRoles = "All" }) {
  // const user = useAuth();
  const { user, role } = useSelector((state) => state.auth);

  if (allowedRoles === "All") return children;

  if (!user || !allowedRoles.includes(role)) {
    console.log(
      "Redirecting due to failed role check:",
      !user,
      !allowedRoles.includes(role)
    );
    return <Navigate to="/" />;
  }

  console.log("Role check passed:", role);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array.isRequired,
};
