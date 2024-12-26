import { useRouteError, Link } from "react-router-dom";
import { Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error?.statusText || error?.message || "Unexpected error occurred";

  return (
    <div className={styles.errorPage}>
      <div className={styles.iconContainer}>
        <ErrorOutlineIcon fontSize="large" className={styles.errorIcon} />
      </div>
      <h1 className={styles.title}>Oops! Something went wrong.</h1>
      <p className={styles.message}>{errorMessage}</p>
      <div className={styles.buttonGroup}>
        <Link to="/" className={styles.link}>
          <Button variant="contained" color="primary" size="large">
            Go to Home
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    </div>
  );
}
