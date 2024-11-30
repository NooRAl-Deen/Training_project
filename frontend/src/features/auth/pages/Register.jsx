import {
  Avatar,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../utils/register-schema"; 
import { useRegister } from "../hooks/auth";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import formatDate from "@/utils/formatDate";
const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mutate, isPending, error, isError } = useRegister((data) => {
    setUser(data.user);
    navigate('/login');
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema), 
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "",
      phoneNumber: "",
      city: ""
    },
  });

  if(isError) {
    console.log(error)
  }

  const onSubmit = (data) => {
    const { confirmPassword, password, ...credentials } = data;
    credentials.password_prop = data.password;
    console.log(credentials);
    mutate(credentials);
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password_prop"
            label="password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <FormControl fullWidth margin="normal" error={!!errors.gender}>
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
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="city"
            label="city"
            name="city"
            type="tel"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth margin="normal">
              {/* <InputLabel id="dob-label">Date Of Birth</InputLabel> */}
              <DatePicker
                label="Date Of Birth"
                {...register("dob")}
                onChange={(newValue) => setValue("dob", formatDate(newValue))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
            </FormControl>
          </LocalizationProvider>
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isPending}
            loadingPosition="center"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Sign Up
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
