import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideNavbar from "../../components/SideNavBar/SideNavbar";
import styles from "./RootLayout.module.css";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export default function RootLayout() {
  return (
    <div className={styles.layoutContainer}>
      <SideNavbar />
      <div className={styles.contentContainer}>
        <Header />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
