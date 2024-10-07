import { useState } from "react";
import inputs from "../../components/form/fields/LoginInputs";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import FormButton from "../../components/form/FormButton";
import { isObjectEmpty } from "../../helpers/FormsValidation";
import ErrorMessage from "../../components/errors/ErrorMessage";
import useError from "../../hooks/useError";
import useAuthMutation from "../../hooks/queries/auth/useAuthMutation";
import { handleAxiosError } from "../../error-handling/AxiosErrorsHandlers";
import Spinner from "../../components/Spinner";
import useCurrentToken from "../../hooks/useCurrentToken";
import {translationKeys} from "../../helpers/TranslitionKeys";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { errorMessage, setErrorMessage, triggerError } = useError();
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useAuthMutation("/login");

  const transformedData = {
    username: formData.username,
    password_prop: formData.password,
  };
  const { token, setToken } = useCurrentToken();
  const { t } = useTranslation();
  const handleLogin = (e) => {
    e.preventDefault();
    if (isObjectEmpty(formData)) {
      triggerError(t(translationKeys.EMPTY_FORM_MESSAGE_KEY));
    } else {
      setErrorMessage("");
      mutate(transformedData, {
        onError: async (error) => {
          const message = await handleAxiosError(error);
          triggerError(message);
        },
        onSuccess: (data) => {
          setToken(data.access_token);
          navigate("/profile");
          setErrorMessage("");
        },
      });
    }
  };

  return (
    <main className="bg-gradient vh-100 d-flex align-items-center">
      <div className="container">
        <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card shadow-sm border-light mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2 text-center">
                      <h5 className="card-title fs-4 fw-bold text-primary">
                        {t(translationKeys.LOGIN_FORM_TITLE_KEY)}
                      </h5>
                      <p className="text-muted small">
                        {t(translationKeys.LOGIN_FORM_DESCRIPTION_KEY)}
                      </p>
                    </div>
                    {errorMessage ? (
                      <ErrorMessage message={errorMessage} />
                    ) : null}
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleLogin}
                      noValidate
                    >
                      {inputs.map((input, index) => (
                        <div className="col-12" key={index}>
                          <Input
                            {...input}
                            value={formData[input.name]}
                            onChange={onChange}
                          />
                        </div>
                      ))}
                      <div className="col-12">
                        <FormButton text={isLoading ? <Spinner /> : t(translationKeys.LOGIN_BUTTON_KEY)} />
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          {t(translationKeys.DONT_HAVE_ACCOUNT_KEY)}
                          <Link
                            to="/register"
                            className="text-decoration-none text-primary"
                          >
                            {t(translationKeys.CREATE_AN_ACCOUNT_KEY)}
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
