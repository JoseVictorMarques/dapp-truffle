import './App.css'
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Doctor from './components/actors/doctor/doctor';
import Patient from './components/actors/patient/patient';
import Regulator from './components/actors/regulator/regulator';
import Pharmacy from './components/actors/pharmacy/pharmacy';
import DCenter from './components/actors/dcenter/dcenter';
import SignIn from './components/login/signIn';
import ChangePass from './components/login/changePassword';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';


const web3 = new Web3(Web3.givenProvider);
console.log(web3.givenProvider)
const contractAddress = web3.utils.toChecksumAddress('0xf766540f535d9B114a5FBC2Cbb37b42c639e3C52');
const abi = require('./abi.json');
const contract = new web3.eth.Contract(abi, contractAddress)

function App() {
  // Hold variables that will interact with our contract and frontend
  const [accounts, setAccounts] = useState([]);
  //web3.eth.getAccounts().then((out) => {accounts = out; console.log(accounts);} );
  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    if (web3.currentProvider == null)
    {
      swal({
        title: "Metamask Missing",
        text: "Enable your Metamask extension and reload the page",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }
    else{
      // Contract address of the deployed smart contract
      web3.eth.requestAccounts().then((out) => {setAccounts(out); } );
    }

  });
  
  return (
  <Router>
    <Switch >
      <Route path="/regulator/:rid">
        <Regulator contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/patient/:pid">
        <Patient contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/doctor/:did">
        <Doctor contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/pharmacy/:phid">
        <Pharmacy contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/dcenter/:dcid">
        <DCenter contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/changepassword">
        <ChangePass contract ={contract} accounts ={accounts}/>
      </Route>
      <Route path="/">
        <SignIn contract ={contract} web3={web3} accounts ={accounts}/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App