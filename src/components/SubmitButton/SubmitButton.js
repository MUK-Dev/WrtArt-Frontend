import React from "react";

const submitButton = (props) => (
	<button
		className="waves-effect waves-light btn indigo"
		style={{ margin: "5px" }}
	>
		{props.children}
	</button>
);

export default submitButton;
