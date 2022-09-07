import { Button } from "@material-ui/core";

export default function AddDoctor(props) {
	function addDoctor(name, specialty, password, CRM) {
		try {
			props.contract.methods
				.addDoctor(name, specialty, password, CRM)
				.send({ from: props.accounts[0], gas: 3000000 });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("Doctor Name").value = "";
		document.getElementById("Doctor Specialty").value = "";
		document.getElementById("Doctor Pass").value = "";
		document.getElementById("Doctor CRM").value = "";
	}

	return (
		<div>
			<div>
				<input id="Doctor Name" className="textinput" placeholder="Doctor Name" />
			</div>
			<div>
				<input id="Doctor Specialty" className="textinput" placeholder="Doctor Specialty" />
			</div>
			<div>
				<input id="Doctor CRM" className="textinput" placeholder="Doctor CRM" />
			</div>
			<div>
				<input id="Doctor Pass" className="textinput" type="password" placeholder="Password" />
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
					addDoctor(
						document.getElementById("Doctor Name").value,
						document.getElementById("Doctor Specialty").value,
						document.getElementById("Doctor Pass").value,
						document.getElementById("Doctor CRM").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
