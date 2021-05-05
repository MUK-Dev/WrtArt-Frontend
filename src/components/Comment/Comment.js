import React from "react";

const comment = (props) => (
	<div className="card z-depth-0">
		<div className="card-content">
			<span className="card-title">
				<b>{props.name}</b>
			</span>
			<p>{props.comment}</p>
		</div>
		<hr className="container" />
	</div>
);

export default comment;
