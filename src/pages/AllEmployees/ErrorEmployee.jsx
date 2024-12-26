import { Link, useParams, useRouteError } from "react-router-dom";
import styles from "./ErrorEmployee.module.css";
import { useSelector } from "react-redux";

const ErrorEmployee = () => {
  const error = useRouteError();
  const { list: employeesData } = useSelector((state) => state.employees);
  const { id } = useParams();

  if (!employeesData) {
    return <p className={styles.notFound}>Employee data is unavailable.</p>;
  }

  let employee;
  if (id) {
    employee = employeesData.find((emp) => emp.id.toString() === id.toString());
  }

  if (id && !employee) {
    return <p className={styles.notFound}>Employee not found</p>;
  }

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.title}>Oops! Something went wrong.</h1>
      <p className={styles.message}>
        We encountered an error while loading the page.
      </p>
      {error ? (
        <div className={styles.errorDetails}>
          <h2 className={styles.detailsTitle}>Error Details:</h2>
          <p>Status: {error.status || "Unknown"}</p>
          <p>
            Message: {error.statusText || error.message || "An error occurred"}
          </p>
        </div>
      ) : (
        <p>No specific error details available.</p>
      )}
      <p className={styles.redirect}>
        Please try refreshing the page or go back to the{" "}
        <Link to="/" className={styles.link}>
          homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default ErrorEmployee;
