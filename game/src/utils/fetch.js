/** @format */

export const api_address = "http://localhost:5500";

// const authLevels = {
//   pleb: 1,
//   rookie: 2,
//   master: 3,
//   kingen: 4,
// };

// const getAuthLevel = (level) => {
//   switch (level) {
//     case authLevels.pleb:
//       // return some kind of auth
//       break;
//     case authLevels.rookie:
//       // return some kind of auth
//       break;
//     case authLevels.master:
//       // return some kind of auth
//       break;
//     case authLevels.kingen:
//       // return some kind of auth
//       break;
//     default:
//     // return false;
//   }
// };

// get
export const GET = async (endpoint) => {
  return await fetch(api_address + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const PROTECTED_GET = async (endpoint, authLevel) => {
  return await fetch(api_address + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   authorization: getAuthLevel(authLevel),
    },
  }).then((res) => res.json());
};

// post
export const POST = async (endpoint, data) => {
  console.log(JSON.stringify(data));
  return await fetch(api_address + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const PROTECTED_POST = async (endpoint, data, authLevel) => {
  return await fetch(api_address + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   authorization: getAuthLevel(authLevel),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
