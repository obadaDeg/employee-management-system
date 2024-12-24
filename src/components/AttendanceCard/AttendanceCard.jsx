import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AttendanceCard.module.css";
import { defaultImage } from "../../utils/constants";

export default function AttendanceCard({ data }) {
  console.log(data);
  
  return (
    <Link to={`/employees/${data.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={data.image || defaultImage} alt={data.name} className={styles.cardImage} />
        <h3>{data.name}</h3>
        <p>Date: {data.date}</p>
        <p>Status: {data.status}</p>
        <p>Time In: {data.timeIn}</p>
        <p>Time Out: {data.timeOut}</p>
      </div>
    </Link>
  );
}

AttendanceCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    timeIn: PropTypes.string.isRequired,
    timeOut: PropTypes.string.isRequired,
  }),
};
