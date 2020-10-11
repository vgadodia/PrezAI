import React from 'react';
import {Link} from 'react-router-dom';

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
  Switch } from '@material-ui/core';

import './VeerNavbar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Carter One',
    fontSize: 30,
    fontWeight: 500,
    marginLeft: '10%',
    marginTop: '1%',
    marginBottom: '1%',
  },
  navbar: {
    backgroundColor: '#3563DB',
  },
  menuElements: {
    marginRight: '5%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeElement: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  generateElement: {
    fontWeight: 'bold',
    fontSize: 16,
  }
}));


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function VeerNavbar(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.navbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              PrezAI
            </Typography>
            <Toolbar className={classes.menuElements}>
              <Link to = '/' style = {{textDecoration:'none', color:'#FFFFFF'}}><Button color="inherit" className={classes.homeElement}>Home</Button></Link>
              <Link to = '/generate' style = {{textDecoration:'none', color:'#FFFFFF'}}><Button color="inherit" className={classes.generateElement}>Generate</Button></Link>
              
            </Toolbar>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
