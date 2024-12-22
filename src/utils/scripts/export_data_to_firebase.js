import admin from "firebase-admin";
import fs from "fs";

admin.initializeApp({
  credential: admin.credential.cert(
    "C:\\Users\\Obada.Daghlas\\Desktop\\employee-management-system\\src\\utils\\scripts\\serviceKey.json"
  ),
});

const db = admin.firestore();

const employeesData = JSON.parse(
  fs.readFileSync(
    "C:\\Users\\Obada.Daghlas\\Desktop\\employee-management-system\\src\\utils\\scripts\\employees.json",
    "utf8"
  )
);
const authData = JSON.parse(
  fs.readFileSync(
    "C:\\Users\\Obada.Daghlas\\Desktop\\employee-management-system\\src\\utils\\scripts\\auth.json",
    "utf8"
  )
);

async function uploadEmployees() {
  const employees = employeesData.employees;

  for (const empId in employees) {
    const emp = employees[empId];
    const docRef = db.collection("employees").doc(empId);
    await docRef.set(emp);
    console.log(`Employee ${empId} uploaded successfully.`);
  }
}

async function uploadUsers() {
  const users = authData.users;

  for (const userId in users) {
    const user = users[userId];
    const docRef = db.collection("users").doc(userId);
    await docRef.set(user);
    console.log(`User ${userId} uploaded successfully.`);
  }
}

async function uploadRoles() {
  const roles = authData.roles;

  for (const roleName in roles) {
    const role = roles[roleName];
    const docRef = db.collection("roles").doc(roleName);
    await docRef.set(role);
    console.log(`Role ${roleName} uploaded successfully.`);
  }
}

async function uploadData() {
  try {
    await uploadEmployees();
    await uploadUsers();
    await uploadRoles();
    console.log("All data uploaded successfully.");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

uploadData();
