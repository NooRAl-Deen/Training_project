import { useTranslation } from "react-i18next";
import {translationKeys} from "../../helpers/TranslitionKeys";

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">{t(translationKeys.ABOUT_TITLE_KEY)}</h2>
        <p className="text-center">
          {t(translationKeys.ABOUT_DESCRIPTION_KEY)}
        </p>
      </div>
    </div>
  );
};

export default About;
