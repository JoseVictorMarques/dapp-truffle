// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MedRecord {
    // Model a Candidate

    struct Diagnosis {
        string diagnosis_code;
        uint medicine_code;
        uint exam_code;
        uint timestamp;
        uint doctor_id;
        string doctor_obs;
        string exam_result;
    }

    struct Patient {
        uint id;
        string name;
        string password;
        uint totalAppointments;
        uint token;
    }

    struct Doctor{
        uint id;
        string name;
        string specialty;
        uint totalAppointments;
        string password;
        uint token;
        string CRM;
    }

    struct Regulator{
        uint id;
        string name;
        string password;
        uint token;
    }

    struct Pharmacy{
        uint id;
        string name;
        string password;
        uint token;
    }

    struct DCenter{
        uint id;
        string name;
        string password;
        uint token;
    }

    struct Medicine {
        uint code;
        uint patient_id;
        bool was_bought;
    }

    struct Exam {
        uint code;
        uint patient_id;
        bool was_concluded;
        string result;
    }


    mapping(uint => Doctor) public doctors;

    mapping(uint => Patient) public patients;

    mapping(uint => Regulator) public regulators;
    
    mapping(uint => Pharmacy) public pharmacies;

    mapping(uint => DCenter) public dcenters;

    mapping ( uint => Medicine) public medicines;

    mapping ( uint => Exam) public exams;

    mapping (uint => mapping (uint => bool)) public authorizationsDoctor;

    mapping (uint => mapping (uint => bool)) public authorizationsPharmacy;

    mapping (uint => mapping (uint => bool)) public authorizationsDCenter;

    mapping (uint => mapping(uint=> Diagnosis)) public diagnosis;


    // Store Candidates Count
    uint public patientsCount;
    uint public doctorsCount;
    uint public regulatorsCount;
    uint public pharmaciesCount;
    uint public dcentersCount;


    // voted event
    event writedEvent (
        uint indexed _patientId,
        uint indexed _doctorId
    );


    constructor ()  {
        addPatient("Patient-Test","123" );
        addDoctor("Doctor-Test", "Otorrino", "123","1234-SP");
        addRegulator("Admin-Test","123");
        addPharmacy("Pharmacy-Test","123");
        addDCenter("DCenter-Test","123");

    }

    function addPatient (string memory _name,string memory _password) public {
        patientsCount ++;
        patients[patientsCount] = Patient(patientsCount, _name,_password,0, 0);

    }
    function addRegulator (string memory _name,string memory _password) public {
        regulatorsCount ++;
        regulators[regulatorsCount] = Regulator(regulatorsCount, _name, _password,0);
    }

    function addDoctor (string memory _name, string memory _specialty, string memory _password, string memory _CRM) public {
        doctorsCount ++;
        doctors[doctorsCount] = Doctor(doctorsCount, _name, _specialty, 0, _password,0,_CRM);
    }

    function addPharmacy (string memory _name, string memory _password) public{
        pharmaciesCount++;
        pharmacies[pharmaciesCount] = Pharmacy(pharmaciesCount,_name,_password,0);
    }

    function addDCenter (string memory _name,string memory _password) public {
        dcentersCount ++;
        dcenters[dcentersCount] = DCenter(dcentersCount, _name, _password, 0);
    } 

    function addMedicine (uint _code, uint _patientID ) public{
        medicines[_code] = Medicine( _code, _patientID, false);
    }

    function addExam (uint _code, uint _patientID ) public{
        exams[_code] = Exam( _code, _patientID, false,'');
    }

    function random( uint _id) public view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,_id)));
    }

    function compStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));      
    }

    function relations (uint _patientId, uint _Id, bool _authorize, uint _typevalue) public{
        //authorize doctor
        if (_typevalue == 1){
            authorizationsDoctor[_patientId][_Id] = _authorize; 
        }
        //authorize pharmacy
        else if(_typevalue == 2){
            authorizationsPharmacy[_patientId][_Id] = _authorize; 
        }
        //authorize diagnostic center
        else if(_typevalue == 3){
            authorizationsDCenter[_patientId][_Id] = _authorize;
        }
        else{
            require(_typevalue >0 && _typevalue<4, "typevalue relations out of range");
        }
    }

    
    function verifyUser (uint _typevalue, uint _id, string memory _password) public  returns (bool) {

        bool userValid =false;
        if(_typevalue == 1){
            require(compStrings(doctors[_id].password, _password), "doctor pass test"); 
            doctors[_id].token = random(_id);
            userValid = true;
        }
        else if(_typevalue == 2){
            require(compStrings(patients[_id].password, _password), "patient pass test");
            patients[_id].token = random(_id);
            userValid = true;
        }
        else if(_typevalue == 3){
            require(compStrings(regulators[_id].password, _password), "regulator pass test");
            regulators[_id].token = random(_id);
            userValid = true;
        }
        else if(_typevalue == 4){
            require(compStrings(pharmacies[_id].password, _password), "pharmacy pass test");
            pharmacies[_id].token = random(_id);
            userValid = true;
        }
        else if(_typevalue == 5){
            require(compStrings(dcenters[_id].password, _password), "diagnostic center pass test");
            dcenters[_id].token = random(_id);
            userValid = true;
        }
        
        else{
            require(_typevalue >0 && _typevalue<6, "typevalue out of range");
        }
        return userValid;

    }

    function sell_medicine( uint  _medicine, uint _patientID, uint _pharmacyID) public{
        require(authorizationsPharmacy[_patientID][_pharmacyID],"authorizationsPharmacy test" );
        require(medicines[_medicine].code > 0, "medicine test");
        bool atual = medicines[_medicine].was_bought;
        if (atual == false){
            medicines[_medicine].was_bought = true;
        }
    }

    function take_exam( uint  _exam, uint _patientID, uint _dcenterID, uint _patAppoint,string memory _result) public{
        require(authorizationsDCenter[_patientID][_dcenterID],"authorizationsDCenter test" );
        require(exams[_exam].code > 0, "exam test");
        bool atual = exams[_exam].was_concluded;
        if (atual == false){
            exams[_exam].was_concluded = true;
            exams[_exam].result = _result;
            diagnosis[_patientID][_patAppoint].exam_result = _result;
        }
    }

    function change_password(uint _typevalue, uint _id, string memory _password) public  returns (bool) {

        bool userValid =false;
        if(_typevalue == 1){ 
            doctors[_id].password = _password;
            userValid = true;
        }
        else if(_typevalue == 2){
            patients[_id].password = _password;
            userValid = true;
        }
        else if(_typevalue == 3){
            regulators[_id].password = _password;
            userValid = true;
        }
        else if(_typevalue == 4){
            pharmacies[_id].password = _password;
            userValid = true;
        }
        else if(_typevalue == 5){
            dcenters[_id].password = _password;
            userValid = true;
        }
        
        else{
            require(_typevalue >0 && _typevalue<6, "typevalue out of range");
        }
        return userValid;

    }

    function appointment (uint _doctorId, uint _patientId,  string memory _patientDiagnosis, uint _medicine, uint _exam, uint _timestamp, string memory _obs) public {
        // require doctorId valid
        require(_doctorId > 0 && _doctorId <= doctorsCount, "doctorId test");

        // require patientId valid
        require(_patientId > 0 && _patientId <= patientsCount, "patientId test");

        // require authorization test
        require(authorizationsDoctor[_patientId][_doctorId],"authorizationsDoctor test" );


        // update the number of doctorID appointments
        doctors[_doctorId].totalAppointments ++;

        // update the number of patientID appointments
        patients[_patientId].totalAppointments++;
        uint patient_appointment =  patients[_patientId].totalAppointments;

        // update patient diagnosis
        diagnosis[_patientId][patient_appointment] = Diagnosis(_patientDiagnosis,_medicine, _exam, _timestamp, _doctorId, _obs, '');

        if (_medicine != 0){
            addMedicine(_medicine,_patientId);
        }
        if (_exam != 0){
            addExam(_exam,_patientId);
        }

        // trigger voted event
        emit writedEvent(_patientId, _doctorId);
    }
}

