import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const CarCard = ({ car, setCheckChange }) => {

  const navigate = useNavigate();
  
  const handleDeleteCar =async()=>{
    await axios.delete(`http://localhost:4000/api/v1/collections/car/:${car._id}`)
    .then(() => {
      console.log("Successfully Deleted Car");
      alert("Successfully Deleted Car");
      setCheckChange(true);
      navigate('/');

    })
    .catch((error) => {
      console.log("Error:" + error);
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <img src={car.avatar.url} alt={car.modelName} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Date Posted:- {car.createdAt.substring(0, 10)}
              </Typography>
              <Typography variant="h5" component="div">
                Car Model:- {car.modelName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Color:- {car.color}
              </Typography>
              <Typography variant="body2">Mileage:- {car.mileage}</Typography>
              <Typography variant="body2">
                Year Of Model:- {car.yearOfModel}
              </Typography>
              <Typography variant="h5" component="div">
                Price:- {car.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/UpdateCar/${car._id}`}><Button size="small">Update</Button></Link>
              <Button size="small" onClick={handleDeleteCar}>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarCard;
