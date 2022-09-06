import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import './signIn.css'
import { Button, Input } from '@mui/material';

function SignIn(props) {
  const [actor, setActor] = useState('');
  const [id, setID] = useState(0);
  const [password, setPassword]= useState('');
  const [respOK, setRespOk] = useState(undefined);

  const handleChange = (event) => {
    setActor(event.target.value);
  };


  function handleSubmit (ident, pwrd ){
    var uid = parseInt(ident,10);

    try{
      props.contract.methods.verifyUser(actor, uid, pwrd).send( {from: props.accounts[0], gas:3000000} ).then(out=>{setRespOk(out)})
    }catch(error)
    {
      console.log(error);
    }

    setID(uid);
    setPassword(pwrd);
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
          {  
             ( respOK !==undefined && actor === 1)? <Redirect to= {`/doctor/${id}`} />:
             (respOK !==undefined  && actor === 2)? <Redirect to={`/patient/${id}`}  />:
             ( respOK !==undefined && actor === 3)? <Redirect to={`/regulator/${id}`}  />:
             ( respOK !==undefined && actor === 4)? <Redirect to={`/pharmacy/${id}`}  />:
             ( respOK !==undefined && actor === 5)? <Redirect to={`/dcenter/${id}`}  />:
              <Redirect to="/" /> 
          }
      </div>
  );
}

export default SignIn