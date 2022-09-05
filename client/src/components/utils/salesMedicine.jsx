import { Button } from '@mui/material';
import { useState } from 'react';

export default function SalesMedicine(props) {

    const [auth, setAuth] = useState(null)

    function authorizationsPharmacy(request_user, patientID){
          props.contract.methods.authorizationsPharmacy(patientID, request_user).call().then(function(result){
            setAuth(result);})
    }
    function salesMedicine(medicineID, patientID){
        var m_id = parseInt(medicineID);
        var p_id = parseInt(patientID);
        var ph_id = parseInt(props.id);
        authorizationsPharmacy(ph_id, p_id);

        if( isNaN(m_id) || isNaN(ph_id) )
        {
            console.log("Entrada inválida");
        } 
        else{
            try{
                props.contract.methods.sell_medicine(m_id,p_id,ph_id).send( {from: props.accounts[0],gas:3000000} )
            }catch(error){
                console.log(error);
            }
        }
        document.getElementById("Medicine ID").value = '';
        document.getElementById("Patient ID").value = '';
      }

    return(
        <div>
            <div>
                <input 
                id="Medicine ID"
                className="textinput"
                placeholder="Medicine ID"/>
            </div>
            <div>
                <input
                id="Patient ID"
                className="textinput"
                placeholder="Patient ID"
                />
            </div>
            <Button 
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px'}}
                onClick={(e)=>salesMedicine(document.getElementById('Medicine ID').value,
                document.getElementById('Patient ID').value)}
            >
                SUBMIT
            </Button>
            <div className="textdiv" style={{marginTop:"60px"}}>{auth === false? "You are not authorized":   auth === true? "Medicine purchased":null }</div>
        </div>
    )
}