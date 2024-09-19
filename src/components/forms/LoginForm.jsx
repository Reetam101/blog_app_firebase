import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../features/auth/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    console.log(e);
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please fill in all the fields.");
      handleClick();
      return;
    }
    try {
      // Dispatch the registerUser async thunk
      const result = await dispatch(loginUser({ email, password })).unwrap(); // Using unwrap to get the actual result
      if (result) {
        setSuccess("Logged In successfully");
        handleClick();
      }
      // If successful, navigate to the login page
      navigate("/");
    } catch (err) {
      // Handle error if registration fails
      //   console.log(err);
      setError(err);
      handleClick();
    }
    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //   setSuccess('Account created successfully!');
    // } catch (error) {
    //   setError(error.message);
    // }
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login
        </Typography>

        {error && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
            action={action}
          />
        )}
        {success && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={success}
            action={action}
          />
        )}
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleRegister}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
