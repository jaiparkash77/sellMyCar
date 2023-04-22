import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./Home.css"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="SellButton">
        <Link to="/AddCar">
          <Button variant="contained" endIcon={<SendIcon />}>
            Add Car to Sell
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
