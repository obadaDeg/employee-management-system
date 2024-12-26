import { useState } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

const DatePickerWithAutocomplete = ({ predefinedDates }) => {
  const [selectedDate, setSelectedDate] = (useState < Dayjs) | (null > null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
      >
        <Autocomplete
          options={predefinedDates}
          getOptionLabel={(option) => option.format("DD MMM YYYY")}
          value={selectedDate}
          onChange={(event, newValue) => handleDateChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select or Search Date" />
          )}
        />
        <DatePicker
          label="Pick a Date"
          value={selectedDate}
          onChange={(newValue) => handleDateChange(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

DatePickerWithAutocomplete.defaultProps = {
  predefinedDates: [],
};

DatePickerWithAutocomplete.propTypes = {
  predefinedDates: PropTypes.array,
};



export default DatePickerWithAutocomplete;
