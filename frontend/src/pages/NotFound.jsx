import { useTranslation } from "react-i18next";
import { translationKeys } from "../helpers/TranslitionKeys";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">
          {t(translationKeys.NOT_FOUND_TITLE_KEY)}
        </h2>
        <p className="text-center">
          {t(translationKeys.NOT_FOUND_DESCRIPTION_KEY)}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
