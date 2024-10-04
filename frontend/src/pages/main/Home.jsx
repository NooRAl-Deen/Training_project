import NavComponent from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">Welcome to MyApp</h2>
        <p className="text-center">
          This is a simple application to help you manage your tasks and connect with various services. 
          Please explore the navigation links to learn more about our features and offerings.
        </p>
      </div>
    </div>
  );
};

export default Home;
