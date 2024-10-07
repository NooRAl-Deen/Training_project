import { useTranslation } from "react-i18next";
import useFetchData from "../hooks/queries/useFetchData";
import ProfileSkeletonLoader from "../skeleton-loaders/profile/ProfileSkeletonLoader";
import { translationKeys } from "../helpers/TranslitionKeys";

const Profile = () => {
  const { data, isLoading } = useFetchData("/users/profile");
  const { t } = useTranslation();

  if (isLoading) {
    return <ProfileSkeletonLoader />;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {t(translationKeys.PROFILE_TITLE_KEY)}
      </h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title">
            {t(translationKeys.PROFILE_USER_INFO_KEY)}
          </h4>
          <hr />
          <div className="mt-4">
            <h5 className="text-dark">Name: {data.user.username}</h5>
            <h5 className="text-dark">Email: {data.user.email}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
