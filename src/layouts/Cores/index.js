import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import $ from 'jquery';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Container,  Button, Typography, Card, CardContent, CardActions, CardActionArea,CardMedia, Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import { useState } from "react";
import Footer from "examples/Footer";
import { grey } from "@mui/material/colors";
import { collection,getDocs } from "firebase/firestore";
const useStyle=makeStyles((theme)=>({
  root:{
    width:"100vw",
    height: "100vh",
    paddingTop: theme.spacing(3),
    backgroundColor:"#FDE3FC",
    maxWidth:"none"
    
  },
  card:{
    paddingTop: theme.spacing(3)
  },
  customBadge: {
    backgroundColor: "#348d42",
    color: "white",
    borderRadius: "5px",
    fontWeight: "bold"
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  header:{
    width:"100%",
    height:"100px",
    backgroundColor:"#363a36",
    color:"#fff",
    marginTop:"25px",
    fontWeight:900,
  },
  success:{
    backgroundColor:"#348d42",
    color:"white",
    width:"95px",
    borderRadius:"5px", 
  },
  box: {
    display: "flex",
    padding: 8
  },
  centerBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
}))




function Cores() {
  const { size } = typography;
  const [users,setUsers]=useState([]);
  const classes=useStyle();
  const [data,setData]=useState([]);
  useEffect(async() => {
    await $.get('https://api.spacexdata.com/v3/cores', (post)=>{
      
      setData(post);
   })
  }, [])

  
  const navigate=useNavigate();
  function handleClick(id){
    navigate('/cores/'+ id);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={5} maxWid="sm" mt={2}>
            {data.map(n=>{         
                 return(
                     <Grid item sm={4} >
                     <Card className={classes.card} >
                       <Box  className={`${classes.centerBox} ${classes.box}`}>
                       <Box display="flex" justifyContent="flex-end" alignItems="flex-end" p={1} className={classes.success}>Success</Box>
                       </Box>
                      
                       <CardActionArea>
                         <img alt={n.core_serial}/>
                         
                         <CardContent>
                         <Typography align='center' variant='h4'>{n.core_serial}</Typography>
                         <Typography align='center' variant='subtitle1'>{n.details}</Typography>
                       </CardContent>
                       </CardActionArea>
                       <CardActions>
                       <Box align="center">
                          <Button onClick={()=>handleClick(n.core_serial)} color="primary" size="large" type="submit" variant="outlined">
                                View Details
                          </Button>      
                       </Box>
                            
  
                         
                       </CardActions>
                     </Card>
                   </Grid>)
            })}  
            </Grid>
            <Footer/> 
    </DashboardLayout>
  );
}

export default Cores;
