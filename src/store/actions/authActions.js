export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await fetch("https://firebase-api-url/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("authToken", data.token); // Persist token
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};
