import './App.css'
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Doctor from './components/actors/doctor/doctor';
import Patient from './components/actors/patient/patient';
import Regulator from './components/actors/regulator/regulator';
import Pharmacy from './components/actors/pharmacy/pharmacy';
import DCenter from './components/actors/dcenter/dcenter';
import SignIn from './components/login/signIn';
import { useEffect, useState } from 'react';



// Access our wallet inside of our dapp
const web3 = new Web3(Web3.givenProvider);
console.log(Web3.givenProvider)
// Contract address of the deployed smart contract
const contractAddress = web3.utils.toChecksumAddress('0xEcB1f6CB4d05aBCEf37ba36474571a71F2dc7744');
const abi = require('./abi.json');
const contract = new web3.eth.Contract(abi, contractAddress);

function App() {
  // Hold variables that will interact with our contract and frontend
  const [accounts, setAccounts] = useState([]);
  //web3.eth.getAccounts().then((out) => {accounts = out; console.log(accounts);} );
  useEffect(() => {
    // Atualiza o título do documento usando a API do browser

    web3.eth.getAccounts().then((out) => {setAccounts(out); } );

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
      <Route path="/">
        <SignIn contract ={contract} accounts ={accounts}/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App