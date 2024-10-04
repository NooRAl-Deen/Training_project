import useError from "../../hooks/useError";

const ErrorMessage = () => {
    const { errorMessage } = useError()
  return (
    <div className="alert alert-danger mt-2" role="alert">
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;
