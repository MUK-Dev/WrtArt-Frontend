import React from "react";
import NavItem from "./NavItem/NavItem";
import NavButton from "./NavButton/NavButton";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionType from "../../store/actions";

const sideNav = (props) => (
	<ul className="sidenav sidenav-close" id="mobile-demo">
		<NavItem link="/">
			<p>Home</p>
		</NavItem>
		<NavItem link="/writeArticle">
			<p>New Article</p>
		</NavItem>
		<div className="row center-align">
			{props.isValid ? (
				<NavButton>
					<button
						className="waves-effect waves-light btn indigo"
						onClick={props.onLogout}
					>
						Logout
					</button>
				</NavButton>
			) : (
				<div>
					<NavButton>
						<NavLink
							className="waves-effect waves-light btn indigo"
							to="/login"
						>
							Login
						</NavLink>
					</NavButton>
					<NavButton>
						<NavLink
							className="waves-effect waves-light btn indigo"
							to="/register"
						>
							Register
						</NavLink>
					</NavButton>
				</div>
			)}
		</div>
	</ul>
);

const mapStateToProps = (state) => {
	return {
		isValid: state.validated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch({ type: actionType.LOGOUT }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(sideNav);
