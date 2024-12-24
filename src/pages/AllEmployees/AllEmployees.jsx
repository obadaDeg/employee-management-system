import TableView from "../../components/Table/TableView";
import { employeeColumns, employeeFields } from "../../utils/constants";
import { employeesData } from "../../utils/dummyData";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import stylesModule from "./AllEmployees.module.css";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal"; 
import Form from "../../components/Form/Form";
import useForm from "../../hooks/useForm";

export default function AllEmployeesPage() {
  const addEmployeeModal = useModal();
  const editEmployeeModal = useModal();
  const deleteEmployeeModal = useModal();

  const data = employeesData.map((employee) => ({
    ...employee,
    actions: [
      <Link key={`view-${employee.id}`} to={`/employees/${employee.id}`}>
        <VisibilityIcon fontSize="small" className={stylesModule.actionIcon} />
      </Link>,
      <EditIcon
        key={`edit-${employee.id}`}
        fontSize="small"
        className={stylesModule.actionIcon}
        onClick={editEmployeeModal.openModal}
      />,
      <DeleteIcon
        key={`delete-${employee.id}`}
        fontSize="small"
        className={stylesModule.actionIcon}
        onClick={deleteEmployeeModal.openModal}
      />,
    ],
  }));

  const {} = useForm();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={addEmployeeModal.openModal}
        disableElevation
        disableFocusRipple
        disableRipple
        sx={{ margin: "0 1rem" }}
      >
        Add New Employee
      </Button>

      <Modal
        isOpen={addEmployeeModal.isOpen}
        title="Add New Employee"
        onClose={addEmployeeModal.closeModal}
      >
        <Form fields={employeeFields} onSubmit={() => {}
        }/>
      </Modal>

      <Modal
        isOpen={editEmployeeModal.isOpen}
        title="Edit Employee"
        onClose={editEmployeeModal.closeModal}
      >
        hi
      </Modal>

      <Modal
        isOpen={deleteEmployeeModal.isOpen}
        title="Are you sure you want to delete this employee?"
        onClose={deleteEmployeeModal.closeModal}
      >
        hey
      </Modal>

      <TableView columns={employeeColumns} data={data} />
    </>
  );
}
