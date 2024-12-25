import firebase from "firebase/compat/app";
import { redirect } from "react-router-dom";

const BASE_URL =
  "https://firestore.googleapis.com/v1/projects/employee-managemnt-system/databases/(default)/documents";

/**
 * Helper function to fetch and validate the authentication token.
 * Ensures that the token is valid and current.
 */
export const getAuthToken = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken(true); // Force refresh to ensure token validity
      return token;
    }
    throw new Error("No user is logged in.");
  } catch (error) {
    console.error("Error fetching auth token:", error.message);
    return null;
  }
};

/**
 * Helper function to check token validity.
 * Redirects to the authentication page if the token is invalid or missing.
 */
export const checkAuthToken = async () => {
  const token = await getAuthToken();
  if (!token) {
    return redirect("/login"); 
  }
  return token;
};

/**
 * Generalized API request function with token handling and enhanced error checks.
 * @param {string} url - API endpoint URL.
 * @param {string} method - HTTP method (GET, POST, PATCH, DELETE).
 * @param {object|null} body - Request body for POST/PATCH requests.
 * @returns {Promise<object>} - JSON response from the API or error object.
 */
const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const token = await checkAuthToken(); // Ensure token validity
    if (!token) return; // Prevent further execution if token is invalid

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API request failed:", errorData);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in apiRequest:", error.message);
    return {
      message: error.message,
      status: error.status || 500,
    };
  }
};

/**
 * Fetch data from a collection in Firestore.
 * @param {string} collection - Collection name.
 * @param {string} params - Query parameters (optional).
 * @returns {Promise<object>} - Collection data.
 */
const fetchCollection = async (collection, params = "") => {
  const url = `${BASE_URL}/${collection}${params}`;
  return await apiRequest(url);
};

/**
 * Perform operations on a specific document in a Firestore collection.
 * @param {string} collection - Collection name.
 * @param {string} documentId - Document ID.
 * @param {string} method - HTTP method (GET, PATCH, DELETE).
 * @param {object|null} body - Request body for PATCH requests.
 * @returns {Promise<object>} - Document data.
 */
const manipulateDocument = async (collection, documentId, method, body = null) => {
  const url = `${BASE_URL}/${collection}/${documentId}`;
  return await apiRequest(url, method, body);
};

// API Endpoint Functions

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
  await fetchCollection("attendance", `?orderBy=employeeId&equalTo=${employeeId}`);

export const addAttendance = async (body) =>
  await apiRequest(`${BASE_URL}/attendance`, "POST", body);

export const updateAttendance = async (attendanceId, body) =>
  await manipulateDocument("attendance", attendanceId, "PATCH", body);

export const deleteAttendance = async (attendanceId) =>
  await manipulateDocument("attendance", attendanceId, "DELETE");

export const fetchRoles = async () => await fetchCollection("roles");

export const fetchUsers = async () => await fetchCollection("users");

/**
 * Get the duration until the token expires.
 * @returns {number} - Remaining duration in milliseconds.
 */
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}
