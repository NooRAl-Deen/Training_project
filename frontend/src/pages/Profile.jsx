import NavComponent from "../components/Navbar";

import useFetchData from "../hooks/queries/useFetchData";
import ProfileSkeletonLoader from "../skeleton-loaders/profile/ProfileSkeletonLoader";

const Profile = () => {
  const { data, isLoading } = useFetchData("/users/profile");

  if (isLoading) {
    return <ProfileSkeletonLoader />
  }

  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">Profile</h2>
        <div className="mt-4">
          <h4>Name: {data.user.username}</h4>
          <h4>Email: {data.user.email}</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
