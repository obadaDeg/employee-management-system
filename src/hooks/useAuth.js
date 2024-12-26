import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdTokenResult().then((idTokenResult) => {
          setUser({
            ...firebaseUser,
            role: idTokenResult.claims.role,
          });
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
