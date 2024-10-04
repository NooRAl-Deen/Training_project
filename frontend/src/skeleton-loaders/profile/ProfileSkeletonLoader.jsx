import NavSkeletonLoader from "../nav/NavSkeletonLoader";
import "./SkeletonLoader.css";

const ProfileSkeletonLoader = () => {
  return (
    <>
      <NavSkeletonLoader />
      <div className="container mt-5">
        <h2 className="text-center">
          <span className="placeholder col-6"></span>
        </h2>
        <div className="mt-4">
          <h4>
            <span className="placeholder  col-8"></span>
          </h4>
          <h4>
            <span className="placeholder  col-8"></span>
          </h4>
        </div>
        <div className="mt-4">
          <span
            className="placeholder  col-12"
            style={{ height: "150px" }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeletonLoader;
