import TableView from "../../components/Table/TableView";
import { employeeColumns } from "../../utils/constants";
import { employeesData } from "../../utils/dummyData";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
// import stylesModule from "./AllEmployees.module.css"

const styles = {
  ":hover": {
    color: "red",
  },
};

export default function AllEmployeesPage() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const data = employeesData.map((employee) => ({
    ...employee,
    actions: [
      <VisibilityIcon
        key={`view-${employee.id}`}
        fontSize="small"
        sx={styles}
      />,
      <EditIcon key={`edit-${employee.id}`} fontSize="small" sx={styles} />,
      <DeleteIcon key={`delete-${employee.id}`} fontSize="small" sx={styles} />,
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
        // className={stylesModule.newButton}
        sx={{
          margin: "0 1rem"
        }}
      >
        Add New Employee
      </Button>

      <Modal isOpen={open} title="Add New Employee" onClose={handleClose}>
        <form>
          
        </form>
      </Modal>

      <TableView columns={employeeColumns} data={data} />
    </>
  );
}
