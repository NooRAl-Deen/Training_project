import useError from "../../hooks/useError";

const ErrorMessage = () => {
  const { errorMessage } = useError();
  return (
    <div
      className="alert alert-danger alert-dismissible fade show mt-2"
      role="alert"
    >
      <strong>Error!</strong> {errorMessage}
    </div>
  );
};

export default ErrorMessage;
