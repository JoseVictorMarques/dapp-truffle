import { Button } from "@material-ui/core";

export default function AddDCenter(props) {
	function addDCenter(name, password) {
		try {
			props.contract.methods
				.addDCenter(name, password)
				.send({ from: props.accounts[0], gas: 3000000 });
		} catch (error) {
			console.log(error);
		}
		document.getElementById("Diagnostic Center Name").value = "";
		document.getElementById("Diagnostic Center Pass").value = "";
	}

	return (
		<div>
			<div>
				<input
					id="Diagnostic Center Name"
					className="textinput"
					placeholder="Diagnostic Center Name"
				/>
			</div>
			<div>
				<input
					id="Diagnostic Center Pass"
					className="textinput"
					type="password"
					placeholder="Password"
				/>
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
					addDCenter(
						document.getElementById("Diagnostic Center Name").value,
						document.getElementById("Diagnostic Center Pass").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
