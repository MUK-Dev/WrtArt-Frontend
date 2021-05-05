import React from "react";

const input = (props) => {
	let inputElement = null;
	switch (props.elementType) {
		case "input":
			inputElement = (
				<div className="input-field">
					<input
						{...props.elementConfig}
						id={props.label}
						className="validate"
						value={props.value}
						onChange={props.changed}
						required
					/>
					<label htmlFor={props.label}>{props.label}</label>
				</div>
			);
			break;
		case "textarea":
			inputElement = (
				<div className="input-field">
					<textarea
						{...props.elementConfig}
						id={props.label}
						className="materialize-textarea"
						value={props.value}
						onChange={props.changed}
						style={{ height: "150px", marginBottom: "0", paddingBottom: "0" }}
						required
					/>
					<label htmlFor={props.label}>{props.label}</label>
				</div>
			);
			break;

		default:
			inputElement = (
				<div className="input-field">
					<input
						{...props.elementConfig}
						id={props.label}
						className="validate"
						value={props.value}
						onChange={props.changed}
						required
					/>
					<label htmlFor={props.label}>{props.label}</label>
				</div>
			);
			break;
	}
	return inputElement;
};

export default input;
