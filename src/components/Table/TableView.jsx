import { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
} from "@mui/material";
import styles from "./TableView.module.css";
import { NavLink } from "react-router-dom";
import { defaultImage } from "../../utils/constants";

function TableView({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  showRows,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  console.log(data);
   

  const paginatedRows = Array.isArray(data)
    ? showRows
      ? data.slice(0, showRows)
      : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  

  return (
    <Paper
      sx={{
        margin: "1rem",
      }}
    >
      {!showRows && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          component="div"
        />
      )}

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} className={styles.tableHeader}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.key === "name" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={row.image || defaultImage}
                          alt="User"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <NavLink to={`/employees/${row.id}`}>
                          {row[column.key]}
                        </NavLink>
                      </div>
                    ) : (
                      row[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TableView.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  defaultRowsPerPage: PropTypes.number,
  showRows: PropTypes.number,
};

export default TableView;
