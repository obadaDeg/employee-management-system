import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import styles from "./TableView.module.css";

function TableView({
  columns,
  data,
  rowsPerPageOptions = [5, 10],
  defaultRowsPerPage = 10,
  showRows,
}) {
  const rowsPerPage = defaultRowsPerPage;

  const paginatedRows = showRows ? data.slice(0, showRows) : data;
  console.log(paginatedRows);
  

  return (
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
            {columns.map((column) => {
              return <TableCell key={column.key}>{row[column.key]}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
      {!showRows && (
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={0}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
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
