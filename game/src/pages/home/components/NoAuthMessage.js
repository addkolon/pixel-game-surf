/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NoAuthMessage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, [2000]);
  }, []);
  return (
    <>
      <h1>U FUCKER</h1>
    </>
  );
};
