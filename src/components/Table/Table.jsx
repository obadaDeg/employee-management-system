import PropTypes from "prop-types";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from "./Table.module.css";

function Table(props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={styles.tableHeader}>Name</TableCell>
          <TableCell className={styles.tableHeader}>Date</TableCell>
          <TableCell className={styles.tableHeader}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>2024-12-19</TableCell>
          <TableCell>Present</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>2024-12-19</TableCell>
          <TableCell>Absent</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

Table.propTypes = {};

export default Table;
