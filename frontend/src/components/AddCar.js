import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarRentalIcon from '@mui/icons-material/CarRental';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import "./AddCar.css"

const theme = createTheme();

export default function AddCar() {
    const [avatarPreview, setAvatarPreview] = useState("/Car.png");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //     firstName: data.get('firstName'),
    //     lastName: data.get('lastName'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const modelName = data.get("modelName");
    const yearOfModel = data.get("yearOfModel");
    const price = data.get("price");
    const color = data.get("color");
    const mileage = data.get("mileage");
    const avatar = data.get("avatar");

    await axios
      .post("http://localhost:4000/api/v1/addCar", {
        modelName,
        yearOfModel,
        price,
        color,
        mileage,
        avatar
      },config)
      .then(() => {
        console.log("Successfully Added Car");
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CarRentalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Car
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            encType="multipart/form-data"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="modelName"
                  required
                  fullWidth
                  id="modelName"
                  label="Model Name"
                  placeholder="Honda, Maruti, BMW, Audi, etc."
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="yearOfModel"
                  label="Year of Model"
                  name="yearOfModel"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="color"
                  label="Color"
                  type="text"
                  id="color"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mileage"
                  label="Mileage"
                  type="text"
                  id="mileage"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                </div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  required
                  fullWidth
                  name="avatar"
                  type="file"
                  id="avatar"
                  accept="image/*"  
                  onChange={registerDataChange}                
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Car
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
