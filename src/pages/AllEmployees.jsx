import TableView from "../components/Table/TableView";
import { employeesData } from "../utils/dummyData";

export default function AllEmployeesPage() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "id", label: "ID" },
    { key: "designation", label: "Designation" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const data = employeesData.map((employee) => ({
    ...employee,
    actions: "View/Edit/Delete",
  }));

  return <TableView columns={columns} data={data} />;
}
