import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

function StatusMessage({ status, error, dataName }) {
  if (status === "loading")
    return (
      <>
        <p>Loading {dataName}...</p>
        <CircularProgress />
      </>
    );
  if (status === "failed")
    return (
      <p>
        Error loading {dataName}: {error}
      </p>
    );
  return null;
}

StatusMessage.propTypes = {
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  dataName: PropTypes.string,
};

export default StatusMessage;
