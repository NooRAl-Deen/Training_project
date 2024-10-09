import { useTranslation } from "react-i18next";


const Home = () => {
  const { t } = useTranslation('main\\home');
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">{t('home_title')}</h2>
        <p className="text-center">{t('home_description')}</p>
      </div>
    </div>
  );
};

export default Home;
