import React from "react";
import "./SuccessBox.css";

const successBox = (props) => (
	<div className="waves-effect waves-light btn indigo FadeIn">
		{props.children}
	</div>
);

export default successBox;
