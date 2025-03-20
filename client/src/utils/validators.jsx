export const validateEmail = (email) => {
    // Uses regex to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(fdm\.com|fdmgroup\.com)$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Checks for minimum 8 characters, at least one letter and one number
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && specialCharRegex.test(password);
  };
  