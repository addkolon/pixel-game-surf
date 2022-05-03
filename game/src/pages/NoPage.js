/** @format */

import { Link } from "react-router-dom";

export const NoPage = () => {
  return (
    <div>
      <h3>No page found</h3>

      <Link to={"/"}>Homepage</Link>
    </div>
  );
};
