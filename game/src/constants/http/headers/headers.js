/** @format */

const auth = process.env.REACT_APP_API_AUTH;

export const headers = {
 GET: {
  "Content-Type": "application/json",
 },
 POST: {
  "Content-Type": "application/json",
 },

 PROTECTED: {
  GET: {
   auth: `${auth}`,
   "Content-Type": "application/json",
  },
  POST: {
   //    auth: `${auth}`,
   "Content-Type": "application/json",
  },
 },
};
