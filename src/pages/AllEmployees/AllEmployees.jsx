import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, CircularProgress } from "@mui/material";
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
import {
  loadEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
} from "../../store/employee-slice";
import styles from "./AllEmployees.module.css";

export default function AllEmployeesPage() {
  const dispatch = useDispatch();
  const { list: employees, status, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

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

  const tableData = employees.map((employee) => ({
    ...employee,
    actions: [
      <Link key={`view-${employee.id}`} to={`/employees/${employee.id}`}>
        <VisibilityIcon fontSize="small" className={styles.actionIcon} />
      </Link>,
      <EditIcon
        key={`edit-${employee.id}`}
        fontSize="small"
        className={styles.actionIcon}
        onClick={() => editEmployeeModal.openModal(employee)}
      />,
      <DeleteIcon
        key={`delete-${employee.id}`}
        fontSize="small"
        className={styles.actionIcon}
        onClick={() => deleteEmployeeModal.openModal(employee.id)}
      />,
    ],
  }));

  if (status === "loading") return <CircularProgress />;
  if (status === "failed") return <p>Error loading employees: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          variant="contained"
          color="primary"
          onClick={addEmployeeModal.openModal}
          disableElevation
          sx={{ margin: "0 1rem" }}
        >
          Add New Employee
        </Button>
        <TextField
          placeholder="Search employees..."
          variant="outlined"
          size="small"
          sx={{ margin: "0 1rem", width: "300px" }}
          onChange={(e) => {
            const searchValue = e.target.value.toLowerCase();
            // You could implement filtering logic here
          }}
        />
      </div>

      <TableView columns={employeeFields} data={tableData} />

      {/* Add Employee Modal */}
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

      {/* Edit Employee Modal */}
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

      {/* Delete Employee Modal */}
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
    </div>
  );
}
