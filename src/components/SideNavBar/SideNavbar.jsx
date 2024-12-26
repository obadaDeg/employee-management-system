import { NavLink } from "react-router-dom";
import AppLogo from "../../assets/AppLogo";
import styles from "./SideNavBar.module.css";
import DashboardLogo from "../../assets/DashboardLogo";
import EmployeesIcon from "../../assets/EmployeesIcon";
import CalendarIcon from "../../assets/CalendarIcon";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function SideNavbar() {
  const { user, role } = useSelector((state) => state.auth);

  return (
    <>
      <nav className={styles.sideNavbar}>
        <AppLogo />
        <menu className={styles.list}>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? styles.active : "")}
              end
            >
              {({ isActive }) => (
                <>
                  <DashboardLogo isActive={isActive} />
                  Dashboard
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/employees"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {({ isActive }) => (
                <>
                  <EmployeesIcon isActive={isActive} />
                  All Employees
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/attendance"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {({ isActive }) => (
                <>
                  <CalendarIcon isActive={isActive} />
                  Attendance
                </>
              )}
            </NavLink>
          </li>
          {user && role == "root" && (
            <li>
              <Button
                variant="contained"
                disableElevation
                disableFocusRipple
                disableRipple
              >
                Add New Admin
              </Button>
            </li>
          )}
        </menu>
      </nav>
    </>
  );
}
