import { Button } from "@material-ui/core";

export default function AddPatient(props) {
	function addPatient(name, password) {
		try {
			props.contract.methods
				.addPatient(name, password)
				.send({ from: props.accounts[0], gas: 3000000 });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("Patient Name").value = "";
		document.getElementById("Patient Pass").value = "";
	}

	return (
		<div>
			<div>
				<input id="Patient Name" className="textinput" placeholder="Patient Name" />
			</div>
			<div>
				<input id="Patient Pass" className="textinput" type="password" placeholder="Password" />
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
				onClick={(e) =>
					addPatient(
						document.getElementById("Patient Name").value,
						document.getElementById("Patient Pass").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
