import { useTranslation } from "react-i18next";


const NotFound = () => {
  const { t } = useTranslation('not-found');
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">
          {t('not_found_title')}
        </h2>
        <p className="text-center">
          {t('not_found_description')}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
