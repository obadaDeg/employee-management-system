import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./EmployeeDetailsPage.module.css";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { defaultImage } from "../../utils/constants";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const { list: employeesData } = useSelector((state) => state.employees);
  const { list: attendanceData } = useSelector((state) => state.attendance);

  const employee = employeesData.find((emp) => emp.id === id);
  console.log(employee, "employee");

  if (!employee) {
    return <p className={styles.notFound}>Employee not found</p>;
  }

  const employeeAttendance = attendanceData.flatMap((record) => {
    const attendanceRecord = record[id];
    if (!attendanceRecord || !attendanceRecord.mapValue?.fields) {
      console.warn(`Invalid attendance data for id: ${id}`, record);
      return [];
    }

    const fields = attendanceRecord.mapValue.fields;
    const rawCheckinTime = fields.checkinTime?.integerValue;

    return {
      date: new Date(record.id),
      status: fields.status?.stringValue || "Unknown",
      checkinTime: rawCheckinTime
        ? new Date(parseInt(rawCheckinTime, 10) * 1000)
        : "Invalid Time",
    };
  });

  console.log(employeeAttendance, "employeeAttendance");

  return (
    <div className={styles.employeeDetailsContainer}>
      <h1 className={styles.employeeName}>{employee.name?.stringValue}</h1>
      <img
        src={employee.image?.stringValue || defaultImage}
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
          employeeAttendance.map((record, index) => {
            console.log(record);
            
            return <AttendanceCard
              key={index}
              id={id}
              name={employee.name?.stringValue}
              image={employee.image?.stringValue}
              date={record.date.toLocaleDateString()}
              status={record.status}
              timeIn={record.checkinTime.toLocaleTimeString()}
            />;
          })
        )}
      </section>
    </div>
  );
}
