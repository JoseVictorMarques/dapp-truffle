import { Button } from "@material-ui/core";
import { useState } from "react";

export default function PatientInfo(props) {
	const [patientName, setPatientName] = useState("");
	const [diagnosis, setDiagnosis] = useState([]);
	const [autho, setAutho] = useState(null);

	function conversionDate(timestamp) {
		timestamp = parseInt(timestamp);
		var d = new Date(timestamp);
		let hours = d.getHours();
		if (hours < 10) {
			hours = "0" + hours;
		}
		let minutes = d.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var converted = hours + ":" + minutes + ", " + d.toDateString();
		return converted;
	}

	function authorizationAnalisis(request_user, request_type, patientID) {
		if (request_type === 1) {
			props.contract.methods
				.authorizationsDoctor(patientID, request_user)
				.call()
				.then(function (result) {
					setAutho(result);
				});
		} else if (request_type === 2) {
			setAutho(request_user === patientID);
		} else if (request_type === 3) {
			setAutho(true);
		} else if (request_type === 4) {
			props.contract.methods
				.authorizationsPharmacy(patientID, request_user)
				.call()
				.then(function (result) {
					setAutho(result);
				});
		} else if (request_type === 5) {
			props.contract.methods
				.authorizationsDCenter(patientID, request_user)
				.call()
				.then(function (result) {
					setAutho(result);
				});
		} else {
			setAutho(false);
		}
	}

	function PatientInfo(patientID) {
		authorizationAnalisis(props.request_user, props.request_type, patientID);
		var p_id = parseInt(patientID, 10);
		console.log(autho);
		if (isNaN(p_id)) {
			window.alert("Invalid input : type needs to be int");
		} else {
			try {
				props.contract.methods
					.patients(p_id)
					.call()
					.then(function (result) {
						console.log(props);
						setPatientName(result.name);
						if (result.totalAppointments > 0 && result.token > 0) {
							var aux = [];
							for (let i = 1; i <= result.totalAppointments; i++) {
								props.contract.methods
									.diagnosis(p_id, i)
									.call()
									.then(function (result2) {
										var obj = {
											id: i,
											code: result2.diagnosis_code,
											medicine: result2.medicine_code,
											exam: result2.exam_code,
											doctor: result2.doctor_id,
											date: conversionDate(result2.timestamp),
											doctor_obs: result2.doctor_obs,
											exam_result: result2.exam_result
										};
										console.log(obj)
										aux.push(obj);
										setDiagnosis(aux);
									});
							}
						}
					});
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div>
			<div>
				<input id="getPatientWithID" className="textinput" placeholder="Patient ID" />
			</div>

			<Button
				variant="contained"
				style={{
					backgroundColor: "#63235A",
					color: "#FFFFFF",
					float: "right",
					marginRight: "220px",
					marginTop: "10px",
				}}
				onClick={(e) => PatientInfo(document.getElementById("getPatientWithID").value)}
			>
				GET DATA
			</Button>
			<div className="textdiv" style={{ marginTop: "60px" }}>
				{autho === false
					? "You are not authorized"
					: patientName
					? "Patient Name: " + patientName
					: null}
			</div>
			<div className="tabledetails">
				<tbody>
					{diagnosis.length > 0 && autho?
					<tr>
						<th>Appointment </th>
						<th>Diagnosis </th>
						<th>Medicine </th>
						<th>Exam </th>
						<th>Doctor </th>
						<th>Datetime </th>
						<th>Comments </th>
						<th>Result of Exam</th>
					</tr>:null
					}
					{diagnosis.length > 0 && autho
					? diagnosis.map((elem,i) => (
						<tr key={i}>
							<td>{elem.id} </td>
							<td>{elem.code} </td>
							<td>{elem.medicine} </td>
							<td>{elem.exam} </td>
							<td>{elem.doctor} </td>
							<td>{elem.date} </td>
							<td>{elem.doctor_obs} </td>
							<td>{elem.exam_result} </td>
						</tr>
					)): null}
				</tbody>
				
			</div>
		</div>
	);
}
