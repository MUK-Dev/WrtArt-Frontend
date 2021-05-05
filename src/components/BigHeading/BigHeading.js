import React from "react";

const bigHeading = (props) => (
	<h3 className="center-align" style={{ margin: "0", padding: "20px" }}>
		{props.children}
	</h3>
);

export default bigHeading;
