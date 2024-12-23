import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.auth.user);
  if (!user || !allowedRoles.includes(user.role))
    return <Navigate to="/login" />;
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array.isRequired,
};
