import React, { Component } from "react";
import BigHeading from "../../components/BigHeading/BigHeading";
import Row from "../../components/Row/Row";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import MaterializeSpinner from "../../components/MaterializeSpinner/MaterializeSpinner";
import ColumnImage from "../../components/ColumnImage/ColumnImage";
import Compass from "../../assets/compass.png";
import SuccessBox from "../../components/SuccessBox/SuccessBox";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import "./Register.css";

class Register extends Component {
	state = {
		registerForm: {
			name: {
				elementType: "input",
				label: "Full Name",
				elementConfig: {
					type: "text",
				},
				value: "",
			},
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
			confirmPassword: {
				elementType: "input",
				label: "Confirm Password",
				elementConfig: {
					type: "password",
				},
				value: "",
			},
		},
		showSpinner: false,
		showSuccessBox: false,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = { ...this.state.registerForm };
		const updatedElement = { ...updatedForm[inputIdentifier] };
		updatedElement.value = event.target.value;
		updatedForm[inputIdentifier] = updatedElement;
		this.setState({ registerForm: updatedForm });
	};

	submitHandler = (event) => {
		event.preventDefault();
		if (
			this.state.registerForm.password.value ===
				this.state.registerForm.confirmPassword.value &&
			this.state.registerForm.password.value !== "" &&
			this.state.registerForm.confirmPassword.value !== ""
		) {
			this.setState({ showSpinner: true });
			const credentials = {
				name: this.state.registerForm.name.value,
				email: this.state.registerForm.email.value,
				password: this.state.registerForm.password.value,
			};
			axios
				.post("/register", credentials)
				.then((res) => {
					this.props.onRegister(res.data);
					this.setState({ showSpinner: false });
					setTimeout(() => {
						this.props.history.goBack();
					}, 500);
				})
				.catch((err) => {
					console.log(err);
					this.setState({ showSpinner: false });
				});
		} else {
			this.setState({ showSuccessBox: true });
			setTimeout(() => {
				this.setState({ showSuccessBox: false });
			}, 2000);
		}

		//Check if the use is logged in here or not then post the article
	};

	render() {
		const classes = this.props.isValid ? "Register TurnGreen" : "Register";
		const formElementArry = [];
		for (let key in this.state.registerForm) {
			formElementArry.push({
				id: key,
				config: this.state.registerForm[key],
			});
		}
		return (
			<div className={classes}>
				<BigHeading>Register</BigHeading>
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
										<SubmitButton>Register</SubmitButton>
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
					<div className="center-align">
						{this.state.showSuccessBox ? (
							<SuccessBox>Passwords Don't Match</SuccessBox>
						) : null}
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
		onRegister: (user) => dispatch({ type: actionTypes.GET_USER, user: user }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
