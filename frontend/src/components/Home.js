import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from '@mui/icons-material/Search';
import "./Home.css";
import axios from "axios";
import CarCard from "./CarCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkChange,setCheckChange] = useState(false);
  // const [keyword, setKeyword] = useState("");
  // const [price, setPrice] = useState([0, 1000000]);

  // const handleSearch=(e)=>{
  //   setKeyword(e.target.value);
  // }
  console.log("first")

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      // let link = `http://localhost:4000/api/v1/cars?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      let link = "http://localhost:4000/api/v1/cars";
      const { data } = await axios.get(link);
      setCars(data.cars);
    };
    getData();
    setCheckChange(false);
    setLoading(false);
  }, [checkChange]);

  return (
    <div>
      <Header />
      {/* <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Search" id="fullWidth" />
        <Button variant="contained" endIcon={<SearchIcon />}>
          Search
        </Button>
      </Box> */}
      {loading ? (
        "Loading"
      ) : (
        <div className="SellButton">
          <Link to="/AddCar">
            <Button variant="contained" endIcon={<SendIcon />}>
              Add Car to Sell
            </Button>
          </Link>
          <div>
            {cars.map((elem) => (
              <CarCard key={elem._id} car={elem} setCheckChange={setCheckChange} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
