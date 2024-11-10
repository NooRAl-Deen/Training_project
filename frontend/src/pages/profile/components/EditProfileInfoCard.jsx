import {
  useTranslation,
  Box,
  TextField,
  Button,
  Card,
  Avatar,
  LoadingButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useState,
  useUpdateProfile,
  PROFILE_LOCALE_PATH,
  dayjs,
  formatDate,
} from "@/pages/profile/utils/shared";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  cardStyle,
  boxHeaderStyle,
  avatarBoxStyle,
  employeeInfoStyle,
  boxHeaderButtonsStyle,
  avatarStyle,
  editProfileAvatar,
  editSaveButtonStyle,
} from "@/pages/profile/styles/style";
import schema from "@/pages/profile/utils/validationSchema";
import CardHeader from "./CardHeader";
const EditProfileInfoCard = ({ user, onSave, onCancel }) => {
  const {
    mutate,
    isPending,
    error: apiErrors,
  } = useUpdateProfile(() => onSave(user));
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.username,
      city: user.city || "",
      dob: user.dob ? (user.dob) : null,
      email: user.email,
      gender: user.gender || "",
      phoneNumber: user.phoneNumber,
      profilePic: user.profilePic,
    },
  });
  const { t } = useTranslation(PROFILE_LOCALE_PATH);
  const [selectedImage, setSelectedImage] = useState(null);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setValue("profilePic", file);
    }
  };

  const onSubmit = (data) => {
    console.log(apiErrors);
    const updatedFields = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== user[key]) {
        updatedFields[key] = data[key];
      }
    });

    const originalDob = user.dob;
    const newDob = data.dob;

    if (newDob !== originalDob) {
      updatedFields.dob = formatDate(data.dob);
    }

    const formData = new FormData();
    Object.keys(updatedFields).forEach((key) => {
      formData.append(key, updatedFields[key]);
    });

    mutate(formData);
  };

  return (
    <Card sx={cardStyle}>
      <p>{apiErrors?.message}</p>
      <CardHeader
        title={"Edit Profile"}
        headerStyle={boxHeaderStyle}
        buttonContainerStyle={boxHeaderButtonsStyle}
        actionButton={
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isPending}
            loadingPosition="start"
            startIcon={<SaveRoundedIcon sx={{ mr: 0.5, fontSize: "20px" }} />}
            onClick={handleSubmit(onSubmit)}
            sx={editSaveButtonStyle}
          >
            save
          </LoadingButton>
        }
        cancelButton={
          <Button variant="outlined" color="error" onClick={onCancel}>
            Cancel
          </Button>
        }
      />

      <Box sx={avatarBoxStyle}>
        <Box sx={editProfileAvatar}>
          <Avatar
            src={
              selectedImage ||
              `${import.meta.env.VITE_SERVER_URL}/${user.profilePic}`
            }
            sx={avatarStyle}
          />
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="outlined" component="span" sx={{ mt: 2 }}>
              {t("edit.change_btn")}
            </Button>
          </label>
        </Box>
        <Box sx={employeeInfoStyle}>
          <TextField
            {...register("username")}
            label="Username"
            fullWidth
            error={!!errors.username || !!apiErrors?.response?.data?.username}
            helperText={
              errors.username?.message || apiErrors?.response?.data?.username
            }
          />
          <TextField
            {...register("city")}
            label="City"
            fullWidth
            error={!!errors.city || !!apiErrors?.response?.data?.city}
            helperText={errors.city?.message || apiErrors?.response?.data?.city}
          />
          <TextField
            {...register("email")}
            label="Email"
            fullWidth
            error={!!errors.email || !!apiErrors?.response?.data?.email}
            helperText={
              errors.email?.message || apiErrors?.response?.data?.email
            }
          />
          <TextField
            {...register("phoneNumber")}
            label="Phone Number"
            fullWidth
            error={
              !!errors.phoneNumber || !!apiErrors?.response?.data?.phoneNumber
            }
            helperText={
              errors.phoneNumber?.message ||
              apiErrors?.response?.data?.phoneNumber
            }
          />
          <FormControl
            fullWidth
            error={!!errors.gender || !!apiErrors?.response?.data?.gender}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="gender-label" label="Gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              )}
            />
            {errors.gender && <span>{errors.gender.message}</span>}
            {apiErrors?.response?.data?.gender && (
              <span>{apiErrors?.response?.data?.gender}</span>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Of Birth"
              {...register("dob")}
              onChange={(newValue) => setValue("dob", formatDate(newValue))}
              value={dayjs(getValues("dob"))}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Card>
  );
};

export default EditProfileInfoCard;
