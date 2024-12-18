import { NavLink } from "react-router-dom";
import AppLogo from "../../assets/AppLogo";
import styles from "./SideNavBar.module.css";
import DashboardLogo from "../../assets/DashboardLogo";
import EmployeesIcon from "../../assets/EmployeesIcon";

export default function SideNavbar() {
  return (
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
      </menu>
    </nav>
  );
}
