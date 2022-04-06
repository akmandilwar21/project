import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import $ from 'jquery';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {List, ListItem, ListItemText,Container,Grid,Box, Typography} from '@material-ui/core';
export default function DetailPageCores(){
    const {id}=useParams();
    console.log(id);
    const [data,setData]=useState([]);
    useEffect(async() => {
        await $.get('https://api.spacexdata.com/v3/cores/'+id, (post)=>{
          console.log(post);
          setData(post);
       })
      }, [])
      return <div>
          <DashboardNavbar/>
          
          <Container>
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <Box mt={15}>
                <img src="" alt={data.core_id}/>
                <Box mt={20}>
                    <Typography variant="h4" style={{fontWeight:"600"}}>Launch Site:</Typography>
                </Box>    
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box>
                <Box mt={6}><Typography variant="h6" > Launch Status: {data.status}</Typography></Box>
                <Box mt={4}><Typography variant="h1" style={{fontWeight:"900"}}> {data.core_serial}</Typography></Box>
                <Box mt={2}><Typography variant="h5">{data.details}</Typography></Box>
            </Box>
        </Grid>
    </Grid>
    <Grid container> 
        <Grid item sm={6}>
            <Grid container>
                <Grid item><Typography variant="h6">Id: </Typography></Grid>
                <Grid item><Typography variant="h6" style={{color:"#0ca1ef"}}> {"  "+data.core_serial}</Typography></Grid>
            </Grid>
        </Grid>
        <Grid item sm={6}>
            <Grid container>
                <Grid item><Typography variant="h6">Name: </Typography></Grid>
                <Grid item><Typography variant="h6" style={{color:"#0ca1ef"}}> {"  "+data.core_serial}</Typography></Grid>
            </Grid>
        </Grid>
</Grid>
          </Container>
      </div>

}