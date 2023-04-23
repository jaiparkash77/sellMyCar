import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

export default function ButtonAppBar() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sell My Car
          </Typography>
          <Link to={"/SignIn"}><Button color="inherit" className='headerButton' style={{color:"white"}}>SignIn</Button></Link>
          <Link to={"/SignUp"}><Button color="inherit" className='headerButton' style={{color:"white"}}>SignUp</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}