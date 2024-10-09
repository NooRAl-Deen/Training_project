import { useTranslation } from "react-i18next";

const Spinner = () => {
  const { t } = useTranslation('spinner')
  return (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="visually-hidden">{t('loading_text')}</span>
    </div>
  );
};

export default Spinner;
