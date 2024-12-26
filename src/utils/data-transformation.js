
export const transformAttendanceData = (attendance, employees) => {
    if (!attendance || attendance.length === 0) return [];
  
    const latestAttendanceData = attendance[attendance.length - 1] || {};
  
    return Object.keys(latestAttendanceData)
      .filter((key) => key !== "id")
      .map((key) => {
        const item = latestAttendanceData[key];
        const fields = item?.mapValue?.fields;
  
        if (!fields) {
          console.error(`Invalid attendance item at key ${key}:`, item);
          return null;
        }
  
        const checkinTimeValue = fields.checkinTime?.integerValue
          ? new Date(Number(fields.checkinTime.integerValue))
          : null;
        const checkinTimeFormatted = checkinTimeValue
          ? checkinTimeValue.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A";
  
        const employee = employees.find((employee) => employee.id === key);
        const name = employee?.name?.stringValue || "Unknown Employee";
        const image = employee?.image?.stringValue || null;
  
        return {
          id: key,
          name,
          image,
          designation: employee?.designation?.stringValue || "Unknown",
          type: "Office",
          checkinTime: checkinTimeFormatted,
          status: fields.status?.stringValue || "Unknown",
        };
      })
      .filter(Boolean); 
  };