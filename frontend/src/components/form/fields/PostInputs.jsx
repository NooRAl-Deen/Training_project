const CreatePostInputs = [
  {
    name: "title",
    type: "text",
    placeholder: "Post Title",
    errorMessage: "Title should be 3-50 characters long!",
    label: "Title",
    pattern: "^.{3,50}$",
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Post Description",
    errorMessage: "Description should be at least 10 characters long!",
    label: "Description",
    pattern: "^.{10,}$",
  },
];

export default CreatePostInputs;
