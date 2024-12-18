import SideNavbar from "../components/SideNavBar/SideNavbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <SideNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
