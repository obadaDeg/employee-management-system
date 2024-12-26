import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdTokenResult().then((idTokenResult) => {
          console.log("idTokenResult", idTokenResult);
          
          setUser({
            ...firebaseUser,
            role: idTokenResult.claims.role,
          });

          console.log("firebaseUser", firebaseUser);
          console.log("idTokenResult", idTokenResult);
          
          
          dispatch(
            setUser({
              email: firebaseUser.email,
              role: idTokenResult.claims.role,
              token: idTokenResult.token,
            })
          );
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
