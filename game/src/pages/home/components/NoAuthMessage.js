/** @format */

import { Link } from "react-router-dom";

export const NoAuthMessage = () => {
  return (
    <section style={{ background: "red", minHeight: "100vh" }}>
      <h1>U NEED TO ENTER NAME AND EMAIL AND CHECK THE CHECKBOX HHEHEHEHHEH</h1>
      <Link to={"/"}>OKAY</Link>
    </section>
  );
};
