/*eslint-disable*/

export const isEmailValid = (userEmail: string) => {
  const emailRegex = /^[a-z]+@[a-z]+\.(com)$/;
  return emailRegex.test(userEmail);
};

export const isPasswordValid = (userPassword: string) => {
  return userPassword.length > 6;
};

