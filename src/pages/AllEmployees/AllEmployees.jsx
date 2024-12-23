import TableView from "../../components/Table/TableView";
import { employeeColumns } from "../../utils/constants";
import { employeesData } from "../../utils/dummyData";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import stylesModule from "./AllEmployees.module.css"

export default function AllEmployeesPage() {
  const [openAddNewEmployee, setOpenAddNewEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(false);
  function handleOpen() {
    setOpenAddNewEmployee(true);
  }

  function handleClose() {
    setOpenAddNewEmployee(false);
  }

  const data = employeesData.map((employee) => ({
    ...employee,
    actions: [
      <Link key={`view-${employee.id}`} to={`/employees/${employee.id}`}>
        <VisibilityIcon fontSize="small"  
        className={stylesModule.actionIcon}

        />
      </Link>,
      <EditIcon
        key={`edit-${employee.id}`}
        fontSize="small"
        className={stylesModule.actionIcon}
        onClick={() => {
          setEditEmployee(true);
        }}
      />,
      <DeleteIcon
        key={`delete-${employee.id}`}
        fontSize="small"
        className={stylesModule.actionIcon}
        
        onClick={() => {
          setDeleteEmployee(true);
        }}
      />,
    ],
  }));

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        disableElevation
        disableFocusRipple
        disableRipple
        // className={stylesModule.newButton} // not working
        sx={{
          margin: "0 1rem",
        }}
      >
        Add New Employee
      </Button>

      <Modal
        isOpen={openAddNewEmployee}
        title="Add New Employee"
        onClose={handleClose}
      >
        <form></form>
      </Modal>
      <Modal isOpen={editEmployee} title={"Edit Employee"}>hi</Modal>
      <Modal isOpen={deleteEmployee} title={"Are you sure you want to delete this employee?"}>hey</Modal>

      <TableView columns={employeeColumns} data={data} />
    </>
  );
}
