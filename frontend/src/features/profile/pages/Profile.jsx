import {
  useTranslation,
  lazy,
  Suspense,
  useState,
  useProfile,
  PROFILE_LOCALE_PATH,
} from "@profile/utils/shared";
const EditProfileInfoCard = lazy(() =>
  import("@profile/components/EditProfileInfoCard")
);
const ProfileSkeletonLoader = lazy(() =>
  import("@profile/skeletons/ProfileSkeletonLoader")
);

import ProfileInfoCard from "@profile/components/ProfileInfoCard";
import InterestsCard from "@profile/components/InterestsCard";
import UserStatistics from "../components/UserStatisticsCard";
import dayjs from "dayjs";
const Spinner = lazy(() => import("@/components/ui/Spinner"));
import useAuth from "@/hooks/useAuth"

const Profile = () => {
  const { data = {}, isLoading } = useProfile();
  const {setUser} = useAuth()
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    name: "Natashia Khaleira",
    role: "Head of UX Design",
    phone: "(+62) 812 3456-7890",
    email: "natasiakhaleira@gmail.com",
    avatar: "path_to_avatar_image",
  });

  const { t } = useTranslation(PROFILE_LOCALE_PATH);

  if (isLoading) {
    return <ProfileSkeletonLoader />;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedEmployee) => {
    setEmployee(updatedEmployee);
    // setUser(updatedEmployee)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Suspense fallback={<Spinner />}>
          <EditProfileInfoCard
            user={data.user}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Suspense>
      ) : (
        <ProfileInfoCard t={t} data={data} handleEditClick={handleEditClick} />
      )}
      <InterestsCard t={t} />
      <UserStatistics
        postCount={data.user.posts.length}
        registrationDays={dayjs().diff(dayjs(data.user.createdAt), "day")}
        age={dayjs().diff(dayjs(data.user.dob), "years")}
        t={t}
      />
    </>
  );
};

export default Profile;
