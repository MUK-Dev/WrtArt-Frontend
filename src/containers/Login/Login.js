import React, { Component } from "react";
import BigHeading from "../../components/BigHeading/BigHeading";
import Row from "../../components/Row/Row";
import Compass from "../../assets/compass.png";
import ColumnImage from "../../components/ColumnImage/ColumnImage";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import MaterializeSpinner from "../../components/MaterializeSpinner/MaterializeSpinner";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import "./Login.css";

class Login extends Component {
	state = {
		loginForm: {
			email: {
				elementType: "input",
				label: "Email",
				elementConfig: {
					type: "text",
				},
				value: "",
			},
			password: {
				elementType: "input",
				label: "Password",
				elementConfig: {
					type: "password",
				},
				value: "",
			},
		},
		showSpinner: false,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = { ...this.state.loginForm };
		const updatedElement = { ...updatedForm[inputIdentifier] };
		updatedElement.value = event.target.value;
		updatedForm[inputIdentifier] = updatedElement;
		this.setState({ loginForm: updatedForm });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.setState({ showSpinner: true });
		const credentials = {
			email: this.state.loginForm.email.value,
			password: this.state.loginForm.password.value,
		};
		axios
			.post("/login", credentials)
			.then((res) => {
				this.props.onLogin(res.data);
				this.setState({ showSpinner: false });
				setTimeout(() => {
					this.props.history.goBack();
				}, 500);
			})
			.catch((err) => {
				console.log(err);
				this.setState({ showSpinner: false });
			});
		//Check if the use is logged in here or not then post the article
	};

	render() {
		const classes = this.props.isValid ? "Login TurnGreen" : "Login";
		const formElementArry = [];
		for (let key in this.state.loginForm) {
			formElementArry.push({
				id: key,
				config: this.state.loginForm[key],
			});
		}
		return (
			<div className={classes}>
				<BigHeading>Login</BigHeading>
				<div className="container">
					<div className="card">
						<div className="center-align">
							<Row>
								<div className="col s12 m6">
									<form
										className="center-align"
										onSubmit={(event) => this.submitHandler(event)}
									>
										{formElementArry.map((element) => {
											return (
												<Input
													key={element.id}
													elementType={element.config.elementType}
													elementConfig={element.config.elementConfig}
													value={element.config.value}
													label={element.config.label}
													changed={(event) =>
														this.inputChangedHandler(event, element.id)
													}
												/>
											);
										})}
										<SubmitButton>Login</SubmitButton>
										<br />
										{this.state.showSpinner ? <MaterializeSpinner /> : null}
									</form>
								</div>
								<div
									className="col s12 m6"
									style={{ margin: "0", padding: "0" }}
								>
									<ColumnImage imgsrc={Compass} />
								</div>
							</Row>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isValid: state.validated,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogin: (user) => dispatch({ type: actionTypes.GET_USER, user: user }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
