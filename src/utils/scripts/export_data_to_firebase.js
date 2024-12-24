import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQQLAZWXtqrxYzDSvIzDpjUo7VVcYe3uw",
  authDomain: "employee-managemnt-system.firebaseapp.com",
  projectId: "employee-managemnt-system",
  storageBucket: "employee-managemnt-system.firebasestorage.app",
  messagingSenderId: "927728672402",
  appId: "1:927728672402:web:ca93c4e538dcfcb6dfd04b",
};

const firebaseClientApp = initializeClientApp(firebaseConfig);
const auth = getAuth(firebaseClientApp);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      "C:\\Users\\Obada.Daghlas\\Desktop\\employee-management-system\\src\\utils\\scripts\\serviceKey.json"
    ),
  });
}

signInWithEmailAndPassword(auth, 'example@example.com', 'root123')
  .then((userCredential) => {
    return userCredential.user.getIdToken(); // Generate ID token
  })
  .then((idToken) => {
    console.log("Bearer Token:", idToken);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

const db = getFirestore();

const createUser = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    await db.collection("users").doc(userId).set({
      email: email,
      role: role,
    });

    console.log(`User ${email} created with role ${role}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

const getPermissionsForRole = (role) => {
  const rolesPermissions = {
    root: ["create", "read", "update", "delete"],
    admin: ["read", "update"],
    employee: ["read"],
  };
  return rolesPermissions[role] || [];
};

const uploadEmployees = async (employees) => {
  try {
    const employeesRef = db.collection("employees");

    for (const [id, employee] of Object.entries(employees)) {
      await employeesRef.doc(id).set(employee);
    }

    console.log("Employees uploaded successfully");
  } catch (error) {
    console.error("Error uploading employees:", error.message);
  }
};

const uploadAttendance = async (attendance) => {
  try {
    const attendanceRef = db.collection("attendance");

    for (const [date, employeeData] of Object.entries(attendance)) {
      const dateRef = attendanceRef.doc(date);
      for (const [employeeId, record] of Object.entries(employeeData)) {
        await dateRef.set(
          {
            [employeeId]: record,
          },
          { merge: true }
        );
      }
    }

    console.log("Attendance uploaded successfully");
  } catch (error) {
    console.error("Error uploading attendance:", error.message);
  }
};

const uploadRoles = async (roles) => {
  try {
    const rolesRef = db.collection("roles");
    for (const [role, data] of Object.entries(roles)) {
      await rolesRef.doc(role).set(data);
    }
    console.log("Roles uploaded successfully");
  } catch (error) {
    console.error("Error uploading roles:", error.message);
  }
};

const uploadUsers = async (users) => {
  try {
    const usersRef = db.collection("users");
    for (const [id, user] of Object.entries(users)) {
      await usersRef.doc(id).set(user);
    }
    console.log("Users uploaded successfully");
  } catch (error) {
    console.error("Error uploading users:", error.message);
  }
};

const employees = {
  E001: {
    name: "John Doe",
    designation: "Developer",
    type: "Office",
    status: "Permanent",
  },
  E002: {
    name: "Jane Smith",
    designation: "Manager",
    type: "Remote",
    status: "Permanent",
  },
  E003: {
    name: "Alice Johnson",
    designation: "Designer",
    type: "Office",
    status: "Contract",
  },
  E004: {
    name: "Bob Brown",
    designation: "Developer",
    type: "Remote",
    status: "Permanent",
  },
  E005: {
    name: "Chris Green",
    designation: "Analyst",
    type: "Office",
    status: "Permanent",
  },
  E006: {
    name: "John Doe",
    designation: "Developer",
    type: "Office",
    status: "Permanent",
  },
  E007: {
    name: "Jane Smith",
    designation: "Manager",
    type: "Remote",
    status: "Permanent",
  },
  E008: {
    name: "Alice Johnson",
    designation: "Designer",
    type: "Office",
    status: "Contract",
  },
  E009: {
    name: "Bob Brown",
    designation: "Developer",
    type: "Remote",
    status: "Permanent",
  },
  E010: {
    name: "Chris Green",
    designation: "Analyst",
    type: "Office",
    status: "Permanent",
  },
  E011: {
    name: "John Doe",
    designation: "Developer",
    type: "Office",
    status: "Permanent",
  },
  E012: {
    name: "Jane Smith",
    designation: "Manager",
    type: "Remote",
    status: "Permanent",
  },
  E013: {
    name: "Alice Johnson",
    designation: "Designer",
    type: "Office",
    status: "Contract",
  },
  E014: {
    name: "Bob Brown",
    designation: "Developer",
    type: "Remote",
    status: "Permanent",
  },
  E015: {
    name: "Chris Green",
    designation: "Analyst",
    type: "Office",
    status: "Permanent",
  },
};

const attendance = {
  "2024-12-21": {
    E001: {
      checkinTime: 1699286400000,
      status: "On Time",
    },
    E002: {
      checkinTime: 1699287000000,
      status: "Late",
    },
    E003: {
      checkinTime: null,
      status: "Absent",
    },
    E004: {
      checkinTime: 1699285200000,
      status: "On Time",
    },
  },
  "2024-12-22": {
    E001: {
      checkinTime: 1699372800000,
      status: "On Time",
    },
    E002: {
      checkinTime: 1699373400000,
      status: "Late",
    },
    E003: {
      checkinTime: null,
      status: "Absent",
    },
    E004: {
      checkinTime: 1699372200000,
      status: "On Time",
    },
    E005: {
      checkinTime: 1699374600000,
      status: "Late",
    },
  },
  "2024-12-23": {
    E001: {
      checkinTime: 1699462800000,
      status: "On Time",
    },
    E002: {
      checkinTime: 1699463400000,
      status: "Late",
    },
    E006: {
      checkinTime: 1699461000000,
      status: "On Time",
    },
    E007: {
      checkinTime: null,
      status: "Absent",
    },
    E010: {
      checkinTime: 1699464000000,
      status: "Late",
    },
  },
};

const roles = {
  root: { permissions: ["create", "read", "update", "delete"] },
  admin: { permissions: ["read", "update"] },
  employee: { permissions: ["read"] },
};

const users = {
  userId_12345: { email: "example@example.com", role: "root" },
  userId_67890: { email: "admin@exalt.com", role: "admin" },
  userId_11223: { email: "employee@exalt.com", role: "employee" },
};

// const uploadData = async () => {
//   await uploadEmployees(employees);
//   await uploadAttendance(attendance);
//   await uploadRoles(roles);
//   await uploadUsers(users);
// };

// uploadData();
