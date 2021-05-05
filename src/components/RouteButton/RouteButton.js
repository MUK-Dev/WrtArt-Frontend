import React from "react";
import { Link } from "react-router-dom";

const routeButton = (props) => (
	<Link
		className="waves-effect waves-light btn indigo"
		style={{ margin: "10px" }}
		to={props.link}
	>
		{props.children}
	</Link>
);

export default routeButton;
