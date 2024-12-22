import { Button, Card, Divider, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import EmployeesIcon from "../../assets/EmployeesIcon";
import styles from "./MockCard.module.css";
import { Link } from "react-router-dom";

function MockCard({ title, updatedTime, count = 0, linkTo = "/employees" }) {
  return (
    <Card variant="outlined" className={styles.dashboardCard}>
      <header className={styles.cardHeader}>
        <SvgIcon className={styles.iconWrapper}>
          <EmployeesIcon isActive />
        </SvgIcon>
        <div className={styles.cardText}>
          <h3>{title}</h3>
          <p className={styles.employeeCount}>{count}</p>
        </div>
      </header>
      <Divider variant="fullWidth" className={styles.cardDivider} />
      <footer className={styles.cardFooter}>
        <span>Updated: {updatedTime}</span>
        <Link to={linkTo}>
          <Button>View All</Button>
        </Link>
      </footer>
    </Card>
  );
}

MockCard.propTypes = {
  title: PropTypes.string.isRequired,
  updatedTime: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default MockCard;
