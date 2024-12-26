import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./EmployeeDetailsPage.module.css";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const { list: employeesData } = useSelector((state) => state.employees);
  const { list: attendanceData } = useSelector((state) => state.attendance);

  const employee = employeesData.find((emp) => emp.id === id);

  if (!employee) {
    return <p>Employee not found</p>;
  }

  const employeeAttendance = attendanceData
    .flatMap((record) => {
      const attendance = record[id]?.mapValue?.fields || null;
      if (!attendance) return null;

      return {
        date: new Date(record.date),
        checkinTime: attendance.checkinTime?.integerValue
          ? new Date(
              Number(attendance.checkinTime.integerValue)
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        status: attendance.status?.stringValue || "Unknown",
      };
    })
    .filter(Boolean);

  return (
    <div className={styles.employeeDetailsContainer}>
      <h1 className={styles.employeeName}>{employee.name?.stringValue}</h1>
      <img
        src={employee.image?.stringValue || "/default-avatar.png"}
        alt={employee.name?.stringValue}
        className={styles.employeeImage}
      />
      <p className={styles.employeeDesignation}>
        Designation: {employee.designation?.stringValue || "N/A"}
      </p>

      <section className={styles.attendanceSection}>
        <h2>Attendance Records</h2>
        {employeeAttendance.length === 0 ? (
          <p>No attendance records available.</p>
        ) : (
          employeeAttendance.map((record, index) => (
            <AttendanceCard
              key={index}
              id={id}
              name={employee.name?.stringValue}
              image={employee.image?.stringValue}
              date={record.date.toLocaleDateString()}
              status={record.status}
              timeIn={record.checkinTime}
            />
          ))
        )}
      </section>
    </div>
  );
}
