import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableView from "../../components/Table/TableView";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import useForm from "../../hooks/useForm";
import { useModal } from "../../hooks/useModal";
import {
  defaultImage,
  employeeColumns,
  employeeFields,
} from "../../utils/constants";
import {
  loadEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
} from "../../store/employee-slice";
import styles from "./AllEmployees.module.css";

const transformEmployeeData = (employees) => {
  if (!Array.isArray(employees)) return [];

  return employees.map((employee) => {
    const safeEmployee = employee || {};
    return {
      id: safeEmployee.id || "Unknown ID",
      name: safeEmployee.name?.stringValue || "Unknown Employee",
      image: safeEmployee.image?.stringValue || defaultImage,
      designation: safeEmployee.designation?.stringValue || "Unknown",
      type: safeEmployee.type?.stringValue || "Office",
      status: safeEmployee.status?.stringValue || "Unknown",
    };
  });
};

export default function AllEmployeesPage() {
  const dispatch = useDispatch();
  const {
    list: rawEmployees,
    status,
    error,
  } = useSelector((state) => state.employees);

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const { user, role } = useSelector((state) => state.auth);

  const addEmployeeModal = useModal();
  const editEmployeeModal = useModal();
  const deleteEmployeeModal = useModal();

  const addEmployeeForm = useForm({}, {}, (formValues) => {
    dispatch(createEmployee(formValues));
    addEmployeeModal.closeModal();
    setMessage("Employee added successfully!");
  });

  const editEmployeeForm = useForm({}, {}, (formValues) => {
    dispatch(
      editEmployee({
        employeeId: editEmployeeModal.context.id,
        data: formValues,
      })
    );
    editEmployeeModal.closeModal();
    setMessage("Employee updated successfully!");
  });

  const handleDelete = () => {
    try {
      dispatch(removeEmployee(deleteEmployeeModal.context));
      setMessage("Employee deleted successfully!");
    } catch (error) {
      setMessage(`Error deleting employee: ${error.message}`);
    } finally {
      deleteEmployeeModal.closeModal();
    }
  };

  const employees = useMemo(
    () => transformEmployeeData(rawEmployees || []),
    [rawEmployees]
  );

  const tableData = employees.map((employee) => ({
    name: employee.name || "N/A",
    id: employee.id || "N/A",
    designation: employee.designation || "N/A",
    image: employee.image || defaultImage,
    type: employee.type || "N/A",
    status: employee.status || "N/A",
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

  if (status.load === "loading") return <CircularProgress />;
  if (status.load === "failed")
    return <p>Error loading employees: {error.load}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {user && (role === "root" || role === "admin") && (
          <Button
            variant="contained"
            color="primary"
            onClick={addEmployeeModal.openModal}
            disableElevation
            sx={{ margin: "0 1rem" }}
            disabled={status.load === "loading"}
          >
            {status.load === "loading" ? (
              <CircularProgress size={20} />
            ) : (
              "Add New Employee"
            )}
          </Button>
        )}
      </div>

      {employees.length === 0 && (
        <p>No employees found. Add some to get started!</p>
      )}

      <TableView columns={employeeColumns} data={tableData} />

      {message && <p>{message}</p>}

      <Modal
        isOpen={addEmployeeModal.isOpen}
        title="Add New Employee"
        onClose={addEmployeeModal.closeModal}
      >
        <Form
          fields={employeeFields.map((field) => ({
            ...field,
            value: addEmployeeForm.formValues[field.id] || "",
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
          buttonTitle={status.edit === "loading" ? <CircularProgress /> : "Save"}
        />
      </Modal>

      <Modal
        isOpen={deleteEmployeeModal.isOpen}
        title="Confirm Deletion"
        onClose={deleteEmployeeModal.closeModal}
      >
        {status.remove === "loading" && <CircularProgress />}
        {status.remove === "failed" && (
          <p style={{ color: "red" }}>Error: {status.remove}</p>
        )}
        {status.remove === "succeeded" && (
          <p style={{ color: "green" }}>Deleted successfully!</p>
        )}
        {status.remove !== "loading" && (
          <>
            <p>Are you sure you want to delete this employee?</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                disabled={status.remove === "loading"}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={deleteEmployeeModal.closeModal}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
