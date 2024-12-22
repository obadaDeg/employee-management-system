import Card from "@mui/material/Card";
import EmployeesIcon from "../../assets/EmployeesIcon";
import { Button, Divider, SvgIcon } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { attendanceData } from "../../utils/dummyData";
import { Link } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";

export default function HomePage() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "type", label: "Type" },
    { key: "checkinTime", label: "Check-In Time" },
    { key: "status", label: "Status" },
  ];

  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <MockCard title={"All Employees"}/>
        <MockCard title={"Total Attedance"}/>
      </section>
      <section id="attendance-overview" className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Attendance Overview</h2>
        <TableView columns={columns} data={attendanceData} showRows={5} />
        <Link to={'attendance'} className={styles.viewMore}>
          <Button disableElevation disableFocusRipple disableTouchRipple>
            View More
          </Button>
        </Link>
      </section>
    </div>
  );
}
