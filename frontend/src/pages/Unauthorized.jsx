import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to view this page.</p>
      <Link className="btn btn-primary" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default UnAuthorized;
