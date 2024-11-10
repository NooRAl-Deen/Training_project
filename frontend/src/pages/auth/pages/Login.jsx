import {
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../utils/login-schema";
import { useLogin } from "../hooks/auth";
import useAuth from "@/hooks/useAuth";
import { replace, useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth();
  const { mutate, isPending } = useLogin((data) => {
    setUser(data.user);
    navigate('/profile');
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password_prop: "",
    },
  });



  const onClick = (credentials) => {

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
          Sign In
        </Typography>
        <Box component="form" onSubmit={onClick} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
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
            required
            fullWidth
            id="password_prop"
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password_prop")}
            error={!!errors.password_prop}
            helperText={errors.password_prop?.message}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            loading={isPending}
            loadingPosition="center"
            onClick={handleSubmit(onClick)}
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
