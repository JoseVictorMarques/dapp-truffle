import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { Link } from "react-router-dom";
import './signIn.css'
import { Button, Input } from '@material-ui/core';

function ChangePass(props) {
  const [actor, setActor] = useState('');
  const [contr,setContr] = useState('');

  const handleChange = (event) => {
    setActor(event.target.value);
  };

  const handleContractAddress = (event) => {
     var currentAddress = props.contract.options.address
     if(currentAddress !== event.target.value){
       setContr(event.target.value);
     }
  };

  function handleSubmit (ident, old_pwrd,new_pwrd ){
    var uid = parseInt(ident,10);
    if (props.contract.options.address !== contr){
      props.contract.options.address = contr;

    }
    try{
      props.contract.methods.change_password(actor, uid, old_pwrd, new_pwrd).send( {from: props.accounts[0], gas:3000000})
    }catch(error)
    {
      console.log(error);
    }

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
                <InputLabel  id="demo-simple-select-password">Old Password</InputLabel>
                <Input id="signin_oldpassword"
                type= "password"
                placeholder="type your old password here"/>
              </FormControl>
          </div>
          <div className='password-div'>
              <FormControl>
                <InputLabel  id="demo-simple-select-password">New Password</InputLabel>
                <Input id="signin_newpassword"
                type= "password"
                placeholder="type your new password here"/>
              </FormControl>
          </div>
          <div className='address-div'>
              <FormControl>
                <InputLabel  id="demo-simple-select-address">Address</InputLabel>
                <Input id="signin_contract_address"
                placeholder="type your contract address here"
                onChange={handleContractAddress}/>
              </FormControl>
          </div>
          <Button 
              style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'10vw', marginTop:'10px'}}
              onClick={()=>handleSubmit( document.getElementById('signin_id').value, document.getElementById('signin_oldpassword').value,document.getElementById('signin_newpassword').value)}
          >
            CHANGE
          </Button>
          <Link to="/">
              <Button
              variant="contained"
              style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'10vw',marginTop:'10px'}}>Back</Button>
          </Link>
      </div>
  );
}

export default ChangePass;