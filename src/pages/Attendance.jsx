import TableView from "../components/Table/TableView";
import { attendanceData } from "../utils/dummyData";

export default function Attendance() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "type", label: "Type" },
    { key: "checkinTime", label: "Check-In Time" },
    { key: "status", label: "Status" },
  ];

  return <TableView columns={columns} data={attendanceData} />;
}
