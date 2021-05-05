import React from "react";

const materializeSpinnerLarge = () => (
	<div className="preloader-wrapper large active">
		<div className="spinner-layer">
			<div className="circle-clipper left">
				<div className="circle"></div>
			</div>
			<div className="gap-patch">
				<div className="circle"></div>
			</div>
			<div className="circle-clipper right">
				<div className="circle"></div>
			</div>
		</div>
	</div>
);

export default materializeSpinnerLarge;
