import React, { Component } from "react";
import Navbar from "../Navbar/Navbar.js";
import Aux from "../../hoc/Auxiliary";

class Layout extends Component {
	render() {
		return (
			<Aux>
				<Navbar />
				<main>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
