import { useState , useCallback } from 'react';
import { Tabs,Tab,Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import AddDoctor from '../../utils/addDoctor';
import AddPatient from '../../utils/addPatient';
import AddPharmacy from '../../utils/addPharmacy';
import AddDCenter from '../../utils/addDCenter';
import DoctorInfo from '../../utils/doctorInfo';
import PatientInfo from '../../utils/patientInfo';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link} from "react-router-dom";
import { Button } from '@mui/material';

function TabPanel({ children, value, index }) {
  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function Regulator({contract, accounts}) {
    const {rid} = useParams();
    const [value, setValue] = useState(0);
    const handleChange = useCallback((event, newValue) => {
      setValue(newValue);
    }, []);

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{style: {backgroundColor:"#63235A"}}}
              textColor='primary'
              variant='fullWidth'
              scrollButtons ="auto"
              allowScrollButtonsMobile
            
            >
              <Tab label={"Add doctor"} style={{color:"#63235A"}}/>
              <Tab label={"Add pacient"} style={{color:"#63235A"}}/>
              <Tab label={"Add pharmacy"} style={{color:"#63235A"}}/>
              <Tab label={"Add dcenter"} style={{color:"#63235A"}}/>
              <Tab label={"Doctor info"} style={{color:"#63235A"}}/>
              <Tab label={"Pacient info"} style={{color:"#63235A"}}/>
              
            </Tabs>

            <div className="logo_text">MedRecords</div>
            <SwipeableViews
              onSwitching={(v) => setValue(v)}
              index={value}
            >

      
              <TabPanel value={value} index={0} >
                <AddDoctor contract={contract} accounts={accounts} />
              </TabPanel>
              <TabPanel value={value} index={1} >
                <AddPatient contract={contract} accounts={accounts}/>
              </TabPanel>
              <TabPanel value={value} index={2} >
                <AddPharmacy contract={contract} accounts={accounts}/>
              </TabPanel>
              <TabPanel value={value} index={3} >
                <AddDCenter contract={contract} accounts={accounts}/>
              </TabPanel>
              <TabPanel value={value} index={4} >
                <DoctorInfo contract={contract}/>
              </TabPanel>
              <TabPanel value={value} index={5} >
                <PatientInfo contract={contract} request_user={rid} request_type ={3}/>
              </TabPanel>
            
            </SwipeableViews>
          </div>
            <Link to="/">
              <Button
              variant="contained"
              style={{backgroundColor: '#63235A', color: '#FFFFFF'}}>Back</Button>
            </Link>
        </header>
      </div>
  );


}

export default Regulator