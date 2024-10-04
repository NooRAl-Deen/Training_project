import { useState } from "react";
import { axiosInstance } from "../../api/Axios";
import NavComponent from "../../components/Navbar";
import useCurrentToken from "../../hooks/useCurrentToken";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import FormButton from "../../components/form/FormButton";
import Textarea from "../../components/form/TextArea";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useCurrentToken();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post("/posts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/posts");
      setSuccessMessage("Post created successfully!");
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error(err);
      setErrors({ api: "Failed to create post. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavComponent />
      <div className="container mt-5">
        <h2 className="text-center">Create Post</h2>
        {errors.api && <p className="text-danger">{errors.api}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          <Input
            label="Title"
            type="text"
            error={errors.title}
            id="title"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            error={errors.description}
            id="description"
            name="description"
            placeholder="Post Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
          <FormButton
            text={loading ? "Creating..." : "Create Post"}
            disabled={loading}
            name="noor"
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
