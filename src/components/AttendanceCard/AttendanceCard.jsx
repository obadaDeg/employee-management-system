import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Chip } from "@mui/material";
import styles from "./AttendanceCard.module.css";

export default function AttendanceCard({
  id,
  name,
  date,
  status,
  timeIn,
  image,
}) {
  return (
    <Link to={`/employees/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <Avatar src={image || undefined} alt={name} className={styles.avatar} />
        <div className={styles.cardContent}>
          <h3 className={styles.name}>{name || "Unknown Employee"}</h3>
          <p className={styles.info}>
            <strong>Date:</strong> {date || "N/A"}
          </p>
          <p className={styles.info}>
            <strong>Status:</strong> {status || "N/A"}
          </p>
          <p className={styles.info}>
            <strong>Time In:</strong> {timeIn || "N/A"}
          </p>
        </div>
        <Chip
          label={status === "Present" ? "On Time" : "Late"}
          className={`${styles.chip} ${
            status === "Present" ? styles.onTime : styles.late
          }`}
          size="small"
        />
      </div>
    </Link>
  );
}

AttendanceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timeIn: PropTypes.string.isRequired,
  image: PropTypes.string,
};
