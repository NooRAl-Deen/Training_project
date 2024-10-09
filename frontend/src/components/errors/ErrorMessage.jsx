import { useTranslation } from "react-i18next";
import useError from "../../hooks/useError";

const ErrorMessage = () => {
  const { errorMessage } = useError();
  const { t } = useTranslation('errors\\messages')
  return (
    <div
      className="alert alert-danger alert-dismissible fade show mt-2"
      role="alert"
    >
      <strong>{t('error')}</strong> {errorMessage}
    </div>
  );
};

export default ErrorMessage;
