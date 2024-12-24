import { initializeApp as initializeClientApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Read the service account file
const serviceAccount = JSON.parse(
  fs.readFileSync(
    "C:/Users/Obada.Daghlas/Desktop/employee-management-system/src/utils/scripts/serviceKey.json",
    "utf8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://employee-managemnt-system.firebaseio.com",
});

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

const users = [
  {
    userId: "L9wlYMmkD2RrFImut0Mjtv69LO03",
    role: "root",
  },
  {
    userId: "xctcZqRzm6N8hZsJAHnpbZiYw3p2",
    role: "admin",
  },
  {
    userId: "DyXPvm7bURZxGiCbkNGN35BLDjU2",
    role: "root",
  },
  {
    userId: "TlurNusMDBf62BtcBFXJwWQZOm93",
    role: "admin",
  },
];

users.forEach((user) => {
  admin
    .auth()
    .setCustomUserClaims(user.userId, { role: user.role })
    .then(() => {
      console.log(`Custom claim set for user: ${user.userId}`);
    })
    .catch((error) => {
      console.error("Error setting custom claims:", error);
    });
});
