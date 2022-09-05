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


  // endereço onde a blockchain está rodando
  const providerUrl = 'http://localhost:7545'
  const contract_address = "0x9279402D0b52BB03B362a247a93b1Ab1C348FEd9"
  const web3 = new Web3(providerUrl);
  //const fs = import('fs');
  //const data = fs.readFileSync('./contracts/MedRecord.json');
  //const abi = JSON.parse(data);
  //const contract = new web3.eth.Contract(abi, contract_address);
  
  const abi = require('./abi.json');
  const contract = new web3.eth.Contract(abi, contract_address);



function App() {

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