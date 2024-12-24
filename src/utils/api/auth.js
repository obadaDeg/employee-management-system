const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return {
      message: error.message,
      status: error.status || 500,
    };
  }
};

export const getUserAuthorization = async (email, password) => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQQLAZWXtqrxYzDSvIzDpjUo7VVcYe3uw";
  const body = {
    email,
    password,
    returnSecureToken: true,
  };

  return await apiRequest(url, "POST", body);
};

export const fetchEmployees = async () => {
  const url =
    "https://firestore.googleapis.com/v1/projects/employee-managemnt-system/databases/(default)/documents/employees";
  return await apiRequest(url);
};

export const manipulateEmployee = async (
  employeeId,
  method = "DELETE",
  body = null
) => {
  const url = `https://firestore.googleapis.com/v1/projects/employee-managemnt-system/databases/(default)/documents/employees/${employeeId}`;
  return await apiRequest(url, method, body);
};
