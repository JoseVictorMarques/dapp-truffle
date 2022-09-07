import { Button } from "@material-ui/core";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Relations(props) {
	const [actor, setActor] = useState("");

	const handleChange = (event) => {
		setActor(event.target.value);
	};

	function relations(actorID, authorization) {
		var a_id = parseInt(actorID);
		var p_id = parseInt(props.id);
		var lc_autho = authorization.toLowerCase() === "true";
		console.log(props);
		if (isNaN(a_id) || isNaN(p_id)) {
			console.log("Entrada inválida");
		} else {
			try {
				props.contract.methods
					.relations(p_id, a_id, lc_autho, parseInt(actor))
					.send({ from: props.accounts[0] });
			} catch (error) {
				console.log(error);
			}
		}
		document.getElementById("Actor ID").value = "";
		document.getElementById("Authorization").value = "";
	}

	return (
		<div>
			<div>
				<FormControl style={{ width: 340 }}>
					<InputLabel id="relation-select-ocuppation">Occupation</InputLabel>
					<Select
						labelId="relation-select-label"
						id="relation-select"
						value={actor}
						label="Occupation"
						onChange={handleChange}
					>
						<MenuItem value={1}>Doctor</MenuItem>
						<MenuItem value={2}>Pharmacy</MenuItem>
						<MenuItem value={3}>Diagnostic Center</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div>
				<input id="Actor ID" className="textinput" placeholder="Actor ID" />
			</div>
			<div>
				<input id="Authorization" className="textinput" placeholder="Authorization (true/false)" />
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
					relations(
						document.getElementById("Actor ID").value,
						document.getElementById("Authorization").value
					)
				}
			>
				SUBMIT
			</Button>
		</div>
	);
}
