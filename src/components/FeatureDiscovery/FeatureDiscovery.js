import React from "react";

const featureDiscovery = (props) => (
	<div>
		<div className="fixed-action-btn">
			<button
				id="menu"
				className="waves-effect waves-light btn btn-large btn-floating indigo"
				onClick={props.clicked}
			>
				<i className="material-icons">{props.iconName}</i>
			</button>
		</div>

		<div className="tap-target" data-target="menu">
			<div className="tap-target-content">
				<h5>{props.title}</h5>
				<p>{props.description}</p>
			</div>
		</div>
	</div>
);

export default featureDiscovery;
