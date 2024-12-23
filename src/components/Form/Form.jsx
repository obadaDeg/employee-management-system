import PropTypes from "prop-types";
import styles from "./Form.module.css";

function Form({ fields, onSubmit, defaultValues = {}, className }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form className={`${styles.container} ${className || ""}`} onSubmit={handleSubmit} noValidate>
      {fields.map(({ id, label, type = "text", required = false, options }) => (
        <div key={id} className={styles.formGroup}>
          <label htmlFor={id}>{label}</label>
          {type === "select" ? (
            <select
              id={id}
              name={id}
              defaultValue={defaultValues[id] || ""}
              required={required}
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
              defaultValue={defaultValues[id] || ""}
              required={required}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
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
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  className: PropTypes.string,
};

export default Form;
