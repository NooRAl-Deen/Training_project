import { useState } from "react";
import inputs from "../../components/form/fields/RegisterInputs";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import FormButton from "../../components/form/FormButton";
import { isObjectEmpty } from "../../helpers/FormsValidation";
import ErrorMessage from "../../components/errors/ErrorMessage";
import useError from "../../hooks/useError";
import useAuthMutation from "../../hooks/queries/auth/useAuthMutation";
import { handleAxiosError } from "../../error-handling/AxiosErrorsHandlers";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errorMessage, setErrorMessage, triggerError } = useError();
  const { t } = useTranslation('auth\\register');
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useAuthMutation("/register");

  const transformedData = {
    username: formData.username,
    email: formData.email,
    password_prop: formData.password,
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isObjectEmpty(formData)) {
      triggerError(t('empty_form_message'));
    } else {
      setErrorMessage("");
      mutate(transformedData, {
        onError: (error) => {
          const message = handleAxiosError(error);
          triggerError(message);
        },
        onSuccess: () => {
          setErrorMessage("");
          navigate("/login");
        },
      });
    }
  };

  return (
    <main className="vh-100 d-flex align-items-center">
      <div className="container">
        <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card shadow-sm border-light mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2 text-center">
                    <h5 className="card-title fs-4 fw-bold text-primary">
                      {t('form_title')}
                    </h5>
                    <p className="text-muted small">
                      {t('form_description')}
                    </p>
                  </div>
                  {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
                  <form
                    className="row g-3 needs-validation"
                    onSubmit={handleRegister}
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
                      <FormButton text={isLoading ? <Spinner /> : t('button') } />
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                      {t('already_have_account')}
                        <Link
                          to="/login"
                          className="text-decoration-none text-primary"
                        >
                          {t('login')}
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
