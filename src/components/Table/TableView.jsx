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
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { defaultImage } from "../../utils/constants";
import styles from "./TableView.module.css"; // Ensure you include relevant styles here.

function TableView({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  showRows,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on the search term
  const filteredData = Array.isArray(data)
    ? data.filter((row) =>
        columns.some((column) =>
          String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const paginatedRows = showRows
    ? filteredData.slice(0, showRows)
    : filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page on a new search
  };

  return (
    <Paper
      sx={{
        margin: "1rem",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className={styles.paperHeader}>
      <TextField
        label="Search For Employee"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}

      />

      {!showRows && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          component="div"
        />
      )}
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#333",
                    textAlign: "left",
                    padding: "10px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? "#fafafa" : "#ffffff",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{
                      textAlign: column.key === "id" ? "center" : "left",
                      padding: "10px",
                    }}
                  >
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
                        <NavLink
                          to={`/employees/${row.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#007bff",
                            fontWeight: "500",
                          }}
                        >
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
