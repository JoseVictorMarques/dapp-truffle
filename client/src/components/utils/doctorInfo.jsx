import { Button } from '@mui/material';
import { useState } from 'react'; 

export default function DoctorInfo(props) {
    
    const [doctorName,setDoctorName] = useState('');
    const [doctorSpecialty,setDoctorSpecialty] = useState('');
    const [doctorCRM, setDoctorCRM] = useState('');
    const [totalAppoint,settotalAppoint] = useState(null);

    function DoctorInfo(doctorID){

        var d_id = parseInt(doctorID,10);
        if( isNaN(d_id) )
        { 
            console.log("Entrada inválida");
        }else{
          try{
            props.contract.methods.doctors(d_id).call().then(function(result){
              setDoctorName(result.name);
              setDoctorSpecialty(result.specialty);
              settotalAppoint(result.totalAppointments);
              setDoctorCRM(result.CRM);
            })
          }
          catch(error){
            console.log(error);
          }
        }
      }
    return(
        <div>
            <div>
                <input 
                    id="getDoctorWithID"
                    className="textinput"
                    placeholder="Doctor ID"/>
            </div>
                
            <Button 
                variant="contained"
                style={{backgroundColor: '#63235A', color: '#FFFFFF', float: 'right', marginRight:'220px', marginTop:'10px'}}
                onClick={(e)=>DoctorInfo(document.getElementById('getDoctorWithID').value)}
            >
                GET DATA
            </Button>
            <div className="textdiv" style={{marginTop:"60px"}}>{doctorName ? "Doctor Name: "+doctorName : null}</div>
            <div className="textdiv" style={{marginTop:"30px"}}>{doctorSpecialty ? "Doctor Specialty: "+doctorSpecialty : null}</div>
            <div className="textdiv" style={{marginTop:"30px"}}>{doctorCRM ? "Doctor CRM: "+doctorCRM : null}</div>
            <div className="textdiv">{totalAppoint? "Total appointments: "+totalAppoint: null}</div>
        </div>
    )
}