import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = 'example@example.com'
const password = 'root123'
const auth = getAuth();

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user.getIdToken(); // Generate ID token
  })
  .then((idToken) => {
    console.log("Bearer Token:", idToken);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
