import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { attendanceData } from "../../utils/dummyData";
import { Link } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { attendanceColumns } from "../../utils/constants";
import { useState } from "react";

export default function HomePage() {
  const [viewMode, setViewMode] = useState("cards");

  const handleViewChange = (event, newMode) => {
    if (newMode !== null) setViewMode(newMode);
  };

  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <MockCard title={"All Employees"} updatedTime="Just Now" count={500} linkTo="/employees" />
        <MockCard title={"Total Attendance"} updatedTime="Just Now" count={500} linkTo="/attendance" />
      </section>
      <section id="attendance-overview" className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Attendance Overview</h2>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="View Mode"
          className={styles.toggleButtons}
        >
          <ToggleButton value="table" aria-label="Table View">
            Table View
          </ToggleButton>
          <ToggleButton value="cards" aria-label="Card View">
            Card View
          </ToggleButton>
        </ToggleButtonGroup>

        {viewMode === "table" ? (
          <TableView columns={attendanceColumns} data={attendanceData} showRows={5} />
        ) : (
          <div className={styles.cardViewContainer}>
            <div className={styles.cardView}>
              {attendanceData.map((record) => (
                <AttendanceCard key={record.id} data={record} />
              ))}
            </div>
            <Link to={"attendance"} className={styles.viewMore}>
              <Button disableElevation disableFocusRipple disableTouchRipple>
                View More
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
