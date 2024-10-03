const admin = require("firebase-admin");

export const getUserByEmail = async (email: string) => {
  try {
    const response: any = await admin.auth().getUserByEmail(email);
    return response.toJSON();
  } catch (error: any) {
    return null;
  }
};
