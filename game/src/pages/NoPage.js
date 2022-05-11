/** @format */

import { Link } from "react-router-dom";

export const NoPage = () => {
  return (
    <section style={{ background: "red", minHeight: "100vh" }}>
      <h3>No page found</h3>

      <Link to={"/"}>Homepage</Link>
    </section>
  );
};
