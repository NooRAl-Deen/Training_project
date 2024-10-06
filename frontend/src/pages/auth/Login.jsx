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
  const handleLogin = (e) => {
    e.preventDefault();
    if (isObjectEmpty(formData)) {
      triggerError("Please fill all fields.");
    } else {
      setErrorMessage("");
      mutate(transformedData, {
        onError: (error) => {
          const message = handleAxiosError(error);
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
                        Log In
                      </h5>
                      <p className="text-muted small">
                        Enter your credentials to access your account
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
                        <FormButton text={isLoading ? <Spinner /> : "Login"} />
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have an account?{" "}
                          <Link
                            to="/register"
                            className="text-decoration-none text-primary"
                          >
                            Create an account
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
