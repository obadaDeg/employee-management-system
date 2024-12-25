import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { Link } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { attendanceColumns } from "../../utils/constants";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAttendance } from "../../redux/attendanceSlice";
import { loadEmployees } from "../../redux/employeesSlice";

export default function HomePage() {
  const [viewMode, setViewMode] = useState("cards");
  const dispatch = useDispatch();

  const attendance = useSelector((state) => state.attendance.list);
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    dispatch(loadAttendance());
    dispatch(loadEmployees());
  }, [dispatch]);

  const handleViewChange = (event, newMode) => {
    if (newMode) {
      setViewMode(newMode);
    }
  };

  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <MockCard
          title="All Employees"
          updatedTime="Just Now"
          count={employees.length}
          linkTo="/employees"
        />
        <MockCard
          title="Total Attendance"
          updatedTime="Just Now"
          count={attendance.length}
          linkTo="/attendance"
        />
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
          <ToggleButton value="cards" aria-label="Card View">
            Card View
          </ToggleButton>
          <ToggleButton value="table" aria-label="Table View">
            Table View
          </ToggleButton>
        </ToggleButtonGroup>

        {viewMode === "table" ? (
          <TableView
            columns={attendanceColumns}
            data={attendance}
            showRows={5}
          />
        ) : (
          <div className={styles.cardViewContainer}>
            <div className={styles.cardView}>
              {attendance.map((record) => (
                <AttendanceCard key={record.id} data={record} />
              ))}
            </div>
            <Link to="/attendance" className={styles.viewMore}>
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
