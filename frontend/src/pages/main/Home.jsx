import { useTranslation } from "react-i18next";
import {translationKeys} from "../../helpers/TranslitionKeys";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">{t(translationKeys.HOME_TITLE_KEY)}</h2>
        <p className="text-center">{t(translationKeys.HOME_DESCRIPTION_KEY)}</p>
      </div>
    </div>
  );
};

export default Home;
