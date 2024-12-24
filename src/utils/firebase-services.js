import { Auth } from "firebase-admin/auth";

const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.currentUser.getIdToken()}`,
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

const BASE_URL =
  "https://firestore.googleapis.com/v1/projects/employee-managemnt-system/databases/(default)/documents";

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

const fetchCollection = async (collection, params = "") => {
  const url = `${BASE_URL}/${collection}${params}`;
  return await apiRequest(url);
};

const manipulateDocument = async (
  collection,
  documentId,
  method,
  body = null
) => {
  const url = `${BASE_URL}/${collection}/${documentId}`;
  return await apiRequest(url, method, body);
};

export const fetchEmployees = async () => await fetchCollection("employees");

export const fetchEmployee = async (employeeId) =>
  await manipulateDocument("employees", employeeId, "GET");

export const addEmployee = async (body) =>
  await apiRequest(`${BASE_URL}/employees`, "POST", body);

export const updateEmployee = async (employeeId, body) =>
  await manipulateDocument("employees", employeeId, "PATCH", body);

export const deleteEmployee = async (employeeId) =>
  await manipulateDocument("employees", employeeId, "DELETE");

export const fetchAttendance = async () => await fetchCollection("attendance");

export const fetchEmployeeAttendance = async (employeeId) =>
  await fetchCollection(
    "attendance",
    `?orderBy=employeeId&equalTo=${employeeId}`
  );

export const addAttendance = async (body) =>
  await apiRequest(`${BASE_URL}/attendance`, "POST", body);

export const updateAttendance = async (attendanceId, body) =>
  await manipulateDocument("attendance", attendanceId, "PATCH", body);

export const deleteAttendance = async (attendanceId) =>
  await manipulateDocument("attendance", attendanceId, "DELETE");

export const fetchRoles = async () => await fetchCollection("roles");

export const fetchUsers = async () => await fetchCollection("users");
