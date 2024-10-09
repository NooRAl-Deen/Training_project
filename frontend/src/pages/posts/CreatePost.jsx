import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePostInputs from "../../components/form/fields/PostInputs";
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import FormButton from "../../components/form/FormButton";
import ErrorMessage from "../../components/errors/ErrorMessage";
import Spinner from "../../components/Spinner";
import { isObjectEmpty } from "../../helpers/FormsValidation";
import useError from "../../hooks/useError";
import useCreateMutation from "../../hooks/queries/useCreateMutation";
import { handleAxiosError } from "../../error-handling/AxiosErrorsHandlers";
import { useTranslation } from 'react-i18next';

const CreatePost = () => {
  const { t } = useTranslation('posts\\create');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { errorMessage, setErrorMessage, triggerError } = useError();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateMutation("/posts/");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isObjectEmpty(formData)) {
      triggerError(t("error_fill_all_fields"));
    } else {
      setErrorMessage("");
      mutate(formData, {
        onError: (error) => {
          const message = handleAxiosError(error);
          triggerError(message);
        },
        onSuccess: () => {
          navigate("/posts");
        },
      });
    }
  };

  return (
    <main className="bg-gradient vh-100 d-flex align-items-center">
      <div className="container">
        <section className="section create-post d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                <div className="card shadow-sm border-light mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2 text-center">
                      <h5 className="card-title fs-4 fw-bold text-primary">
                        {t("create_post")}
                      </h5>
                      <p className="text-muted small">
                        {t("fill_details_create_post")}
                      </p>
                    </div>
                    {errorMessage ? (
                      <ErrorMessage message={errorMessage} />
                    ) : null}
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {CreatePostInputs.map((input, index) => (
                        <div className="col-12" key={index}>
                          {input.type === "textarea" ? (
                            <Textarea
                              {...input}
                              value={formData[input.name]}
                              onChange={onChange}
                            />
                          ) : (
                            <Input
                              {...input}
                              value={formData[input.name]}
                              onChange={onChange}
                            />
                          )}
                        </div>
                      ))}
                      <div className="col-12">
                        <FormButton
                          text={isLoading ? <Spinner /> : t("create_post_button")}
                        />
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          {t("want_to_go_back")}{" "}
                          <Link
                            to="/posts"
                            className="text-decoration-none text-primary"
                          >
                            {t("view_all_posts")}
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

export default CreatePost;
