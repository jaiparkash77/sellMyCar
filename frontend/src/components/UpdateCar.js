import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarRentalIcon from "@mui/icons-material/CarRental";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import "./AddCar.css";

const theme = createTheme();

export default function UpdateCar() {
    const [car,setCar] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const [modelName,setModelName] = useState("");
  const [yearOfModel,setYearOfModel] = useState("");
  const [price,setPrice] = useState("");
  const [color,setColor] = useState("");
  const [mileage,setMileage] = useState("");


  useEffect(()=>{
    const getData =async()=>{
        let link = `http://localhost:4000/api/v1/car/${id}`;
        const {data} = await axios.get(link);
        setCar(data.car);
        setModelName(data.car.modelName);
        setYearOfModel(data.car.yearOfModel);
        setPrice(data.car.price);
        setColor(data.car.modelName);
        setMileage(data.car.mileage);
      }
      getData();
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //     firstName: data.get('modelName'),
    //     lastName: data.get('avatar'),
    // });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const modelName = data.get("modelName");
    const yearOfModel = data.get("yearOfModel");
    const price = data.get("price");
    const color = data.get("color");
    const mileage = data.get("mileage");

    await axios
      .put(
        `http://localhost:4000/api/v1/collections/car/${id}`,
        {
          modelName,
          yearOfModel,
          price,
          color,
          mileage
        }
      )
      .then(() => {
        console.log("Successfully Updated Car");
        alert("Successfully Updated Car");
        navigate('/');

      })
      .catch((error) => {
        console.log("Error:" + error);
      });
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
            Update Car
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
                <b>Previous values:</b><br></br> 
                Model Name: {modelName}<br></br>
                Year of Model: {yearOfModel}<br></br>
                Price: {price}<br></br>
                Color: {color}<br></br>
                Mileage: {mileage}<br></br>
              </Grid>
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
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Car
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
