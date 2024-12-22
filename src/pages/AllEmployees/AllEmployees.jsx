import TableView from "../../components/Table/TableView";
import { employeeColumns } from "../../utils/constants";
import { employeesData } from "../../utils/dummyData";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  ":hover": {
    color: "red"
  }
}

export default function AllEmployeesPage() {
  const data = employeesData.map((employee) => ({
    ...employee,
    actions: [
      <VisibilityIcon key={`view-${employee.id}`} fontSize="small" sx={{...styles}}/>,
      <EditIcon key={`edit-${employee.id}`} fontSize="small" sx={{...styles}}/>,
      <DeleteIcon key={`delete-${employee.id}`} fontSize="small" sx={{...styles}}/>,
    ],
  }));

  return <TableView columns={employeeColumns} data={data} />;
}
