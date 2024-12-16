export const handleAxiosError = (error) => {
  if (error.response) {
    const errors = error?.response?.data;

    if (typeof errors === "object") {
      return Object.keys(errors).map((key) => `${errors[key]}\n`);
    } else if (errors.message) {
      return errors.message;
    }
    return `Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    return "Error: No response from server. Please try again later.";
  } else {
    return `Error: ${error.message}`;
  }
};
