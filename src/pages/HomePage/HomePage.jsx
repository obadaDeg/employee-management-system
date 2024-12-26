import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { Link, useSearchParams } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { attendanceColumns } from "../../utils/constants";
import { useSelector } from "react-redux";
import { Home } from "@mui/icons-material";
import PropTypes from "prop-types";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import { transformAttendanceData } from "../../utils/data-transformation";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    list: attendance,
    status: attendanceStatus,
    error: attendanceError,
  } = useSelector((state) => state.attendance);
  const {
    list: employeesData,
    status: employeesStatus,
    error: employeesError,
  } = useSelector((state) => state.employees);

  const viewMode = searchParams.get("view") || "cards";
  const transformedAttendanceData = transformAttendanceData(
    attendance,
    employeesData
  );

  const handleViewChange = (event, newMode) => {
    if (newMode) {
      setSearchParams({ view: newMode });
    }
  };

  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <MockCard
          title={"All Employees"}
          updatedTime={new Date().toLocaleTimeString()}
          count={employeesData.length}
          linkTo="/employees"
        />
        <MockCard
          title={"Total Attendance"}
          updatedTime={new Date().toLocaleTimeString()}
          count={transformedAttendanceData.length}
          linkTo="/attendance"
        />
      </section>
      <section id="attendance-overview" className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Today's Attendance Overview</h2>

        <StatusMessage
          status={attendanceStatus.load}
          error={attendanceError.load}
          dataName="attendance"
        />

        <StatusMessage
          status={employeesStatus.load}
          error={employeesError.load}
          dataName="employees"
        />

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="View Mode"
          className={styles.toggleButtons}
          disabled={attendanceStatus.load === "loading"}
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
            data={transformedAttendanceData}
            showRows={5}
          />
        ) : (
          <div className={styles.cardViewContainer}>
            <div className={styles.cardView}>
              {transformedAttendanceData.map((item) => (
                <AttendanceCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  date={item.date || "N/A"}
                  status={item.status}
                  timeIn={item.checkinTime}
                />
              ))}
            </div>
          </div>
        )}
        <Link to={"attendance"} className={styles.viewMore}>
          <Button
            disableElevation
            disableFocusRipple
            disableTouchRipple
            disabled={
              attendanceStatus.load === "loading" || attendanceError.load
            }
            className={styles.viewMore}
          >
            View More
          </Button>
        </Link>
      </section>
    </div>
  );
}


Home.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timeIn: PropTypes.string.isRequired,
  image: PropTypes.string,
};