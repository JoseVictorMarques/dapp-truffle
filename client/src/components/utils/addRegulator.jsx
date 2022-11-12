import { Button } from "@material-ui/core";

export default function AddRegulator(props) {
	function addRegulator(name, password) {
		try {
			props.contract.methods
				.addRegulator(name, password)
				.send({ from: props.accounts[0], gas: 3000000 });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("Regulator Name").value = "";
		document.getElementById("Regulator Pass").value = "";
	}

	return (
		<div>
			<div>
				<input id="Regulator Name" className="textinput" placeholder="Regulator Name" />
			</div>
			<div>
				<input id="Regulator Pass" className="textinput" type="password" placeholder="Password" />
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
					addRegulator(
						document.getElementById("Regulator Name").value,
						document.getElementById("Regulator Pass").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
