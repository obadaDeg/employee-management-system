import PropTypes from "prop-types";
import styles from "./Form.module.css";

function Form({ fields, onSubmit, className, buttonTitle }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }
  
  return (
    <form
      className={`${styles.container} ${className || ""}`}
      onSubmit={(e) => onSubmit(e)}
      noValidate
    >
      {fields.map(
        ({
          id,
          label,
          type = "text",
          required = false,
          options,
          error,
          value,
          onChange,
          onBlur,
        }) => (
          <div key={id} className={styles.formGroup}>
            <label htmlFor={id}>{label}</label>
            {type === "select" ? (
              <select
                id={id}
                name={id}
                value={value || ""}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={id}
                type={type}
                value={value || ""}
                required={required}
                className={error ? styles.inputError : ""}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
              />
            )}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )
      )}
      <button type="submit">{buttonTitle || "Submit"}</button>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      error: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onBlur: PropTypes.func,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonTitle: PropTypes.string,
};

export default Form;
