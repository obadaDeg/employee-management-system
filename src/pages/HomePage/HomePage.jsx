import { Button } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { attendanceData } from "../../utils/dummyData";
import { Link } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";
import { attendanceColumns } from "../../utils/constants";

export default function HomePage() {
  

  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <MockCard title={"All Employees"} updatedTime="Just Now" count={500} linkTo="/employees"/>
        <MockCard title={"Total Attedance"} updatedTime="Just Now" count={500} linkTo="/attendance"/>
      </section>
      <section id="attendance-overview" className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Attendance Overview</h2>
        <TableView columns={attendanceColumns} data={attendanceData} showRows={5} />
        <Link to={"attendance"} className={styles.viewMore}>
          <Button disableElevation disableFocusRipple disableTouchRipple>
            View More
          </Button>
        </Link>
      </section>
    </div>
  );
}
