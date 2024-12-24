import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableView from "../../components/Table/TableView";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import useForm from "../../hooks/useForm";
import { useModal } from "../../hooks/useModal";
import { employeeFields } from "../../utils/constants";
import { employeesData } from "../../utils/dummyData";
import {
  createEmployee,
  editEmployee,
  removeEmployee,
} from "../../redux/employeesSlice";
import stylesModule from "./AllEmployees.module.css";

export default function AllEmployeesPage() {
  const dispatch = useDispatch();

  const addEmployeeModal = useModal();
  const editEmployeeModal = useModal();
  const deleteEmployeeModal = useModal();

  const addEmployeeForm = useForm({}, {}, (formValues) => {
    dispatch(createEmployee(formValues));
    addEmployeeModal.closeModal();
  });

  const editEmployeeForm = useForm({}, {}, (formValues) => {
    dispatch(
      editEmployee({
        employeeId: editEmployeeModal.context.id,
        data: formValues,
      })
    );
    editEmployeeModal.closeModal();
  });

  const handleDelete = () => {
    dispatch(removeEmployee(deleteEmployeeModal.context));
    deleteEmployeeModal.closeModal();
  };

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
        onClick={() => editEmployeeModal.openModal(employee)}
      />,
      <DeleteIcon
        key={`delete-${employee.id}`}
        fontSize="small"
        className={stylesModule.actionIcon}
        onClick={() => deleteEmployeeModal.openModal(employee.id)}
      />,
    ],
  }));

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
        <Form
          fields={employeeFields.map((field) => ({
            ...field,
            value: addEmployeeForm.values[field.id] || "",
            error: addEmployeeForm.errors[field.id] || null,
            onChange: (value) => addEmployeeForm.handleChange(field.id, value),
            onBlur: () => addEmployeeForm.handleBlur(field.id),
          }))}
          onSubmit={addEmployeeForm.handleSubmit}
          buttonTitle="Add Employee"
        />
      </Modal>

      <Modal
        isOpen={editEmployeeModal.isOpen}
        title="Edit Employee"
        onClose={editEmployeeModal.closeModal}
      >
        <Form
          fields={employeeFields.map((field) => ({
            ...field,
            value: editEmployeeModal.context?.[field.id] || "",
            error: editEmployeeForm.errors[field.id] || null,
            onChange: (value) => editEmployeeForm.handleChange(field.id, value),
            onBlur: () => editEmployeeForm.handleBlur(field.id),
          }))}
          onSubmit={editEmployeeForm.handleSubmit}
          buttonTitle="Save Changes"
        />
      </Modal>

      <Modal
        isOpen={deleteEmployeeModal.isOpen}
        title="Confirm Deletion"
        onClose={deleteEmployeeModal.closeModal}
      >
        <p>Are you sure you want to delete this employee?</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={deleteEmployeeModal.closeModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      <TableView columns={employeeFields} data={data} />
    </>
  );
}
