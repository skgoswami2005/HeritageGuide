export const validateInput = (email, password) => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    Alert.alert("Error", "Please enter a valid email address");
    return;
  }
};
