import { Button } from "@material-ui/core";

export default function AddPharmacy(props) {
	function addPharmacy(name, password) {
		try {
			props.contract.methods
				.addPharmacy(name, password)
				.send({ from: props.accounts[0], gas: 3000000 });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("Pharmacy Name").value = "";
		document.getElementById("Pharmacy Pass").value = "";
	}

	return (
		<div>
			<div>
				<input id="Pharmacy Name" className="textinput" placeholder="Pharmacy Name" />
			</div>
			<div>
				<input id="Pharmacy Pass" className="textinput" type="password" placeholder="Password" />
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
					addPharmacy(
						document.getElementById("Pharmacy Name").value,
						document.getElementById("Pharmacy Pass").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
