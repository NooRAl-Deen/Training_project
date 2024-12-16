import { useTranslation } from "react-i18next";


const About = () => {
  const { t } = useTranslation('main\\about');
  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center">{t('about_title')}</h2>
        <p className="text-center">
          {t('about_description')}
        </p>
      </div>
    </div>
  );
};

export default About;
