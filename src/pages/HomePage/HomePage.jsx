import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./HomePage.module.css";
import TableView from "../../components/Table/TableView";
import { Link, useSearchParams } from "react-router-dom";
import MockCard from "../../components/MockCard/MockCard";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { attendanceColumns } from "../../utils/constants";
import { useSelector } from "react-redux";

function StatusMessage({ status, error, dataName }) {
  if (status === "loading") return <p>Loading {dataName}...</p>;
  if (error) return <p>Error loading {dataName}: {error}</p>;
  return null;
}

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
  const attendanceData = attendance[attendance.length - 1] || [];
  
  console.log(attendance);  


  const handleViewChange = (event, newMode) => {
    if (newMode) {
      setSearchParams({ view: newMode });
    }
  };

  const renderAttendanceCards = () => {
    return Object.keys(attendanceData).map((key) => {
      console.log(attendanceData[key]);
      return <AttendanceCard key={key} data={attendanceData[key]} />;
    });
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
          count={attendanceData.length}
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
          disabled={attendanceStatus === "loading" || attendanceError}
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
            data={attendanceData}
            showRows={5}
          />
        ) : (
          <div className={styles.cardViewContainer}>
            <div className={styles.cardView}>{renderAttendanceCards()}</div>
            <Link to={"attendance"} className={styles.viewMore}>
              <Button
                disableElevation
                disableFocusRipple
                disableTouchRipple
                disabled={attendanceStatus === "loading" || attendanceError}
              >
                View More
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
