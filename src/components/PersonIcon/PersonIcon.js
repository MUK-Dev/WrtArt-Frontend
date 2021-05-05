import React from "react";
import "./PersonIcon.css";

const personIcon = () => (
	<ul
		id="nav-mobile"
		className="right PersonIcon AnimatePersonIcon"
		style={{ marginRight: "20px" }}
	>
		<li>
			<i className="material-icons">person</i>
		</li>
	</ul>
);

export default personIcon;
