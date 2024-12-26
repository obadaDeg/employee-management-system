import { useSelector } from "react-redux";
import TableView from "../../components/Table/TableView";
import { attendanceColumns } from "../../utils/constants";
import { transformAttendanceData } from "../../utils/data-transformation";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
export default function Attendance() {
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

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (attendance.length > 0) {
      setSelectedDate(new Date(attendance[0].id));
    } else {
      setSelectedDate(new Date());
    }
  }, [attendance]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  if (attendanceStatus === "loading" || employeesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (attendanceError.error || employeesError.error) {
    console.error(attendanceError, "attendanceError");
    console.error(employeesError, "employeesError");
    return <div>Error loading data!</div>;
  }

  const filteredAttendance = attendance.filter((entry) => {
    const entryDate = new Date(entry.id);
    return entryDate.toDateString() === selectedDate.toDateString();
  });

  const transformedData = transformAttendanceData(
    filteredAttendance,
    employeesData
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        sx={{ marginX: "1rem" }}
      />
      <TableView columns={attendanceColumns} data={transformedData} />
    </LocalizationProvider>
  );
}
