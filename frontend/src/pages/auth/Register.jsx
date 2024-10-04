import { useState } from "react";
import NavComponent from "../../components/Navbar";
import inputs from "../../components/form/fields/RegisterInputs";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import FormButton from "../../components/form/FormButton";
import { isObjectEmpty } from "../../helpers/FormsValidation";
import ErrorMessage from "../../components/errors/ErrorMessage";
import useError from "../../hooks/useError";
import useAuthMutation from "../../hooks/queries/auth/useAuthMutation";
import { handleAxiosError } from "../../error-handling/AxiosErrorsHandlers";
import Spinner from "../../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errorMessage, setErrorMessage, triggerError } = useError();
  const navigate = useNavigate()
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
      triggerError("Please fill all fields.");
    } else {
      setErrorMessage("");
      mutate(transformedData, {
        onError: (error) => {
          const message = handleAxiosError(error);
          triggerError(message);
        },
        onSuccess: () => {
          setErrorMessage("");
          navigate('/login')
        },
      });
    }
  };

  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">Register</h2>
        <div className="row justify-content-center">
          <div className="col-md-4">
            {errorMessage ? <ErrorMessage message={errorMessage} /> : ""}
            <form className="mt-4" onSubmit={handleRegister} noValidate={true}>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  {...input}
                  value={formData[input.name]}
                  onChange={onChange}
                />
              ))}
              <FormButton text={isLoading ? <Spinner /> : "Register"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
