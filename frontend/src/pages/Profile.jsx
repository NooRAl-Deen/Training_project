import { useTranslation } from "react-i18next";
import useFetchData from "../hooks/queries/useFetchData";
import ProfileSkeletonLoader from "../skeleton-loaders/profile/ProfileSkeletonLoader";


const Profile = () => {
  const { data, isLoading } = useFetchData("/users/profile");
  const { t } = useTranslation('profile');

  if (isLoading) {
    return <ProfileSkeletonLoader />;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {t('profile_title')}
      </h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title">
            {t('profile_user_info')}
          </h4>
          <hr />
          <div className="mt-4">
            <h5 className="text-dark">{t('name_title')} {data.user.username}</h5>
            <h5 className="text-dark">{t('email_title')} {data.user.email}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
