import NavComponent from "../../components/Navbar";

const About = () => {
  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">About Us</h2>
        <p className="text-center">Welcome to our application. We strive to connect users with the best services available.</p>
      </div>
    </div>
  );
};

export default About;
