import { useSelector } from "react-redux";
import TableView from "../../components/Table/TableView";
import { attendanceColumns } from "../../utils/constants";
import { attendanceData } from "../../utils/dummyData";
// import DatePickerWithAutocomplete from "../../components/DatePickerWithAutocomplete/DatePickerWithAutocomplete";

const transformAttendanceData = (attendance) => {
  if (!Array.isArray(attendance)) return [];
  console.log(attendance);

  return attendance.map((attendanceItem) => {
    const safeAttendanceItem = attendanceItem || {};
    return {
      id: safeAttendanceItem.id || "Unknown ID",
      name: safeAttendanceItem.name || "Unknown Name",
      timeIn: safeAttendanceItem.timeIn || "Unknown Time In",
      timeOut: safeAttendanceItem.timeOut || "Unknown Time Out",
      status: safeAttendanceItem.status || "Unknown Status",
    };
  });
};

export default function Attendance() {
  const {
    list: attendance,
    status,
    error,
  } = useSelector((state) => state.attendance);
  const transformedAttendanceData = transformAttendanceData(attendance);

  return (
    <>
      {/* <DatePickerWithAutocomplete /> */}
      <TableView columns={attendanceColumns} data={attendanceData} />
    </>
  );
}
