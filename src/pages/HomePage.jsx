import Card from "@mui/material/Card";
import EmployeesIcon from "../assets/EmployeesIcon";
import { Divider, SvgIcon, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div id="home" className={styles.homeContainer}>
      <section className={styles.dashboardSection}>
        <Card variant="outlined" className={styles.dashboardCard}>
          <header className={styles.cardHeader}>
            <SvgIcon className={styles.iconWrapper}>
              <EmployeesIcon />
            </SvgIcon>
            <div className={styles.cardText}>
              <h3>Total Employees</h3>
              <p className={styles.employeeCount}>500</p>
            </div>
          </header>
          <Divider variant="fullWidth" className={styles.cardDivider} />
          <footer className={styles.cardFooter}>Updated: Just Now</footer>
        </Card>
        <Card variant="outlined" className={styles.dashboardCard}>
          <header className={styles.cardHeader}>
            <SvgIcon className={styles.iconWrapper}>
              <EmployeesIcon />
            </SvgIcon>
            <div className={styles.cardText}>
              <h3>Total Employees</h3>
              <p className={styles.employeeCount}>500</p>
            </div>
          </header>
          <Divider variant="fullWidth" className={styles.cardDivider} />
          <footer className={styles.cardFooter}>Updated: Just Now</footer>
        </Card>
        <Card variant="outlined" className={styles.dashboardCard}>
          <header className={styles.cardHeader}>
            <SvgIcon className={styles.iconWrapper}>
              <EmployeesIcon />
            </SvgIcon>
            <div className={styles.cardText}>
              <h3>Total Employees</h3>
              <p className={styles.employeeCount}>500</p>
            </div>
          </header>
          <Divider variant="fullWidth" className={styles.cardDivider} />
          <footer className={styles.cardFooter}>Updated: Just Now</footer>
        </Card>
        
      </section>
      <section id="attendance-overview" className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Attendance Overview</h2>
        <Table className={styles.attendanceTable}>
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
      </section>
    </div>
  );
}