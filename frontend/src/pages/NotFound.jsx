import NavComponent from "../components/Navbar";

const NotFound = () => {
  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">404 - Not Found</h2>
        <p className="text-center">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
