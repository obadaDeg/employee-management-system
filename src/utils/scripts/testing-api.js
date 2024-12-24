// Import `node-fetch`
import fetch from "node-fetch";

// Import your functions (assuming they are in a file named `api.js`)
import {
  fetchEmployees,
  fetchAttendance,
  fetchUsers,
  getUserAuthorization,
} from "../firebase-services"; // Adjust the path based on your file structure

// Test Functions
const testFetching = async () => {
  try {
    console.log("Testing fetchEmployees...");
    const employees = await fetchEmployees();
    console.log("Employees:", employees);

    console.log("Testing fetchAttendance...");
    const attendance = await fetchAttendance();
    console.log("Attendance:", attendance);

    console.log("Testing fetchUsers...");
    const users = await fetchUsers();
    console.log("Users:", users);

    console.log("Testing getUserAuthorization...");
    const authResponse = await getUserAuthorization(
      "testuser@example.com",
      "password123"
    );
    console.log("User Authorization Response:", authResponse);
  } catch (error) {
    console.error("Error during testing:", error.message);
  }
};

// Run Tests
testFetching();
