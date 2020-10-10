import React from 'react';
import {Link} from 'react-router-dom';
import VeerNavbar from "../components/VeerNavbar"
import SvgComponent from "./SvgComponent"
import SvgComponent2 from "./SvgComponent2"

import { 
  makeStyles, 
  AppBar, 
  Toolbar,  
  Typography, 
  Button, 
  IconButton, 
  CssBaseline, 
  useScrollTrigger, 
  Box, 
  Container,
  Slide,
  Switch, rgbToHex } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  infoContainerBox: {
    height: 600,
  },
  infoComponentBox: {
    width: '50%',
    height: '100%',
    padding: 150,
  },
  infoComponentBox2: {
    width: '50%',
    height: '100%',
    padding: 130,
  },
  titleContainer: {
    height: '57%',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Carter One',
    fontSize: 80,
    fontWeight: 500,
    color: '#3563DB',
    paddingTop: '6%',
  },
  subtitle: {
    color: '#626262',
    fontSize: 25,
    fontFamily: 'Roboto',
    paddingTop: '0.5%',
    fontWeight: 300,
  },
  tryitoutButton: {
    color: '#3563DB',
    borderColor: '#3563DB',
    borderWidth: 2,
    marginTop: '2.5%',
    width: 200,
    height: 50,
    fontSize: 18,
    "&:hover": {
      backgroundColor: '#3563DB',
      color: 'white'
    }
  },
  titleBox: {
    width: '57%',
    height: '57%',
    backgroundColor: 'rgba(53,99,219, 0.1)',
    margin: 'auto',
    marginTop: '2%',
    paddingTop: '2%',
    borderRadius: '5%',
  },
  infoTitle: {
    color: '#3563DB',
    fontFamily: 'Roboto',
    fontSize: 55,
    fontWeight: 600,
    textAlign: 'left',
    lineHeight: 1.3,
  },
  infoText: {
    color: '#626262',
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 400,
    textAlign: 'left',
    lineHeight: 2,
    marginTop: '4%',
  },
  svgMoveRight: {
    marginLeft: 100,
  },
  svgMoveLeft: {
    marginRight: 100,
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <div>
      <VeerNavbar />
      <Box className={classes.rootBox}>
        <Box className={classes.titleContainer}>
          <Typography className={classes.title}>PrezAI</Typography>
          <Typography className={classes.subtitle}>Create powerful presentations through voice interactions.</Typography>
          <Link to = '/generate' style = {{textDecoration:'none'}}><Button variant="outlined" className={classes.tryitoutButton}>Try It Out</Button></Link>
          <Box className={classes.titleBox}>
              <SvgComponent />
          </Box>
        </Box>
          <Toolbar className={classes.infoContainerBox}>
            <Box className={classes.infoComponentBox}>
              <Box className={classes.infoTitle}>Generate Presentations in Real-time.</Box>
              <Box className={classes.infoText}>PrezAI is an interactive platform for automatic generation of presentation slides based on voice inputs. PrezAI will change the way we make presentations.</Box>
            </Box>
            <Box className={classes.infoComponentBox2}>
              <SvgComponent2 className={classes.svgMoveLeft}/>
            </Box>
          </Toolbar>
          <Toolbar className={classes.infoContainerBox}>
            <Box className={classes.infoComponentBox2}>
              <SvgComponent2 className={classes.svgMoveRight}/>
            </Box>
            <Box className={classes.infoComponentBox}>
              <Box className={classes.infoTitle}>What makes PrezAI better?</Box>
              <Box className={classes.infoText}>PrezAI makes it easy and time efficient to create presentations. Users can get rid of the hassle of finding images, as well as compressing large amounts of text into concise points. </Box>
            </Box>
            
          </Toolbar>
          <Toolbar className={classes.infoContainerBox}>
            <Box className={classes.infoComponentBox}>
              <Box className={classes.infoTitle}>PrezAI is Free.</Box>
              <Box className={classes.infoText}>We aim to make this software free of costs, making it a viable choice for everyone. We are also looking to add many more features in the future.</Box>
            </Box>
            <Box className={classes.infoComponentBox2}>
              <SvgComponent2 className={classes.svgMoveLeft}/>
            </Box>
          </Toolbar>
      </Box>
    </div>
    
  );
}

export default Home;