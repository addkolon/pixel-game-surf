/** @format */

export const useArrayRef = () => {
    const refs = [];
    return [refs, (el) => el && refs.push(el)];
  };
  