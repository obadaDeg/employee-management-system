import Header from "../../components/Header/Header";
import SideNavbar from "../../components/SideNavBar/SideNavbar";
import { Outlet } from "react-router-dom";
import styles from './RootLayout.module.css'

export default function RootLayout() {
  return (
    <>
      <SideNavbar />
      <main id={styles.mainContent}>
        <Header />
        <Outlet />
      </main>
    </>
  );
}
