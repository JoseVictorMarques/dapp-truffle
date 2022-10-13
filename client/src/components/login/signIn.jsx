import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import './signIn.css'
import { Button, CardContent, Input, Typography } from '@material-ui/core';


function SignIn(props) {
  const [actor, setActor] = useState('');
  const [id, setID] = useState(0);
  const [respOK, setRespOk] = useState(undefined);

  const handleChange = (event) => {
    setActor(event.target.value);
  };


  function handleSubmit (ident, pwrd ){
    var uid = parseInt(ident,10);
    var type = parseInt(actor,10);
    props.setUserData((prevState) => ({ ...prevState,type: type, id:uid}));

    try{
      props.contract.methods.verifyUser(actor, uid, pwrd).send( {from: props.accounts[0], gas:3000000} ).then(out=>{setRespOk(out)})
    }catch(error)
    {
      console.log(error);
    }

    setID(uid);
    console.log(props.userData)
  }

  function handleChangePass(){
    setRespOk(true);
    setActor(6);
  }

  return (
      <div className='SignIn-All'>
        <Box className='Box-Selector'>
            <FormControl fullWidth>
              <InputLabel  id="demo-simple-select-ocuppation">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={actor}
                label="Occupation"
                onChange={handleChange}
              >
                <MenuItem value={1}>Doctor</MenuItem>
                <MenuItem value={2}>Patient</MenuItem>
                <MenuItem value={3}>Regulator</MenuItem>
                <MenuItem value={4}>Pharmacy</MenuItem>
                <MenuItem value={5}>Diagnostic Center</MenuItem>
              </Select>
            </FormControl> 
          </Box>
          <div className='ID-div'>
            <FormControl>
                <InputLabel  id="demo-simple-select-id">Id</InputLabel>
                <Input
                id="signin_id"
                placeholder="type your id here"/>
            </FormControl>
          </div>
          <div className='password-div'>
              <FormControl>
                <InputLabel  id="demo-simple-select-password">Password</InputLabel>
                <Input id="signin_password"
                type= "password"
                placeholder="type your password here"/>
              </FormControl>
          </div>
          <Button 
              style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'10vw', marginTop:'10px'}}
              onClick={()=>handleSubmit( document.getElementById('signin_id').value, document.getElementById('signin_password').value)}
          >
            Enter
          </Button>
          <Button 
              style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'10vw', marginTop:'10px'}}
              onClick={()=>handleChangePass()}
          >
            Change Password
          </Button>
          <Card className='Instruction-div'>
            <CardContent>
              <Typography color="black" gutterBottom variant="h2">Welcome to MedRecords</Typography>
              <Typography variant="body1">
                MedRecords is a decentralized application for managing medical records of patients, aiming to allow greater control of personal information by the data owner, through authorization and de-authorization mechanisms, and greater sharing of this information between different entities in the industry of health, as the patient grants authorizations.
                In addition, this website uses smart contracts deployed on the Rinkeby public network. Thus, it is necessary to use a digital wallet to carry out the transactions, so it is advisable to use Metamask and crypto faucets to obtain ETH.
                <br/>
                <br/>
                If you are not already logged into your Metamask account and connected to the website, you need to follow a few steps:
                <br/>
                1. Install Metamask as a browser extension.
                <br/>
                2. Login to your Metamask extension and connect to MedRecords.
                <br/>
                3. Reload the page.
                <br/>
                4. Insert the user's occupation data, user id and password.
              </Typography>
            </CardContent>
          </Card>
          {  
             ( respOK !==undefined && actor === 1)? <Redirect to= {`/doctor/${id}`} />:
             (respOK !==undefined  && actor === 2)? <Redirect to={`/patient/${id}`}  />:
             ( respOK !==undefined && actor === 3)? <Redirect to={`/regulator/${id}`}  />:
             ( respOK !==undefined && actor === 4)? <Redirect to={`/pharmacy/${id}`}  />:
             ( respOK !==undefined && actor === 5)? <Redirect to={`/dcenter/${id}`}  />:
             ( respOK !==undefined && actor === 6)? <Redirect to={`/changepassword`} />:
              <Redirect to="/" /> 
          }
      </div>
  );
}

export default SignIn