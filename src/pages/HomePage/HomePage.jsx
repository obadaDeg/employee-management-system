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
  if (status === "failed")
    return (
      <p>
        Error loading {dataName}: {error}
      </p>
    );
  return null;
}

const transformAttendanceData = (attendance, employees) => {
  if (!attendance || attendance.length === 0) return [];

  const latestAttendanceData = attendance[attendance.length - 1] || {};

  return Object.keys(latestAttendanceData)
    .filter((key) => key !== "id")
    .map((key) => {
      const item = latestAttendanceData[key];
      const fields = item?.mapValue?.fields;

      if (!fields) {
        console.error(`Invalid attendance item at key ${key}:`, item);
        return null;
      }

      const checkinTimeValue = fields.checkinTime?.integerValue
        ? new Date(Number(fields.checkinTime.integerValue))
        : null;
      const checkinTimeFormatted = checkinTimeValue
        ? checkinTimeValue.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A";

      const employee = employees.find((employee) => employee.id === key);
      const name = employee?.name?.stringValue || "Unknown Employee";
      const image = employee?.image?.stringValue || null;

      return {
        id: key,
        name,
        image,
        designation: employee?.designation?.stringValue || "Unknown",
        type: "Office",
        checkinTime: checkinTimeFormatted,
        status: fields.status?.stringValue || "Unknown",
      };
    })
    .filter(Boolean); // Remove invalid entries
};

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
                  date={item.date}
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
