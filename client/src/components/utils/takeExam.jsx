import { Button } from "@material-ui/core";
import { useState } from "react";

export default function TakeExam(props) {
	const [auth, setAuth] = useState(null);

	function authorizationsDCenter(request_user, patientID) {
		props.contract.methods
			.authorizationsDCenter(patientID, request_user)
			.call()
			.then(function (result) {
				setAuth(result);
			});
	}
	function takeExam(examID, patientID,patAppoint, result) {
		var e_id = parseInt(examID);
		var p_id = parseInt(patientID);
		var dc_id = parseInt(props.id);
		var pa_id = parseInt(patAppoint);
		authorizationsDCenter(dc_id, p_id);

		if (isNaN(e_id) || isNaN(dc_id)) {
			console.log("Entrada inválida");
		} else {
			try {
				props.contract.methods
					.take_exam(e_id, p_id, dc_id,pa_id,result)
					.send({ from: props.accounts[0], gas: 3000000 });
			} catch (error) {
				console.log(error);
			}
		}
		document.getElementById("Exam ID").value = "";
		document.getElementById("Patient ID").value = "";
		document.getElementById("Appointment ID").value ="";
		document.getElementById("Exam Result").value= "";
	}

	return (
		<div>
			<div>
				<input id="Exam ID" className="textinput" placeholder="Exam ID" />
			</div>
			<div>
				<input id="Patient ID" className="textinput" placeholder="Patient ID" />
			</div>
			<div>
				<input id="Appointment ID" className="textinput" placeholder="Appointment ID" />
			</div>
			<div>
				<input id="Exam Result" className="textinput" placeholder="Exam_Result" />
			</div>
			<Button
				variant="contained"
				style={{
					backgroundColor: "#63235A",
					color: "#FFFFFF",
					float: "right",
					marginRight: "220px",
				}}
				onClick={(e) =>
					takeExam(
						document.getElementById("Exam ID").value,
						document.getElementById("Patient ID").value,
						document.getElementById("Appointment ID").value,
						document.getElementById("Exam Result").value
					)
				}
			>
				SUBMIT
			</Button>
			<div className="textdiv" style={{ marginTop: "60px" }}>
				{auth === false ? "You are not authorized" : null}
			</div>
		</div>
	);
}
