import React, { Component } from "react";
import BigHeading from "../../components/BigHeading/BigHeading";
import Input from "../../components/Input/Input";
import SizedBox from "../../components/SizedBox/SizedBox";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import SuccessBox from "../../components/SuccessBox/SuccessBox";
import FeatureDiscovery from "../../components/FeatureDiscovery/FeatureDiscovery";
import M from "materialize-css/dist/js/materialize.min";
import axios from "../../axios";
import { connect } from "react-redux";

class WriteArticle extends Component {
	state = {
		composeForm: {
			title: {
				elementType: "input",
				label: "Title",
				elementConfig: {
					type: "text",
				},
				value: "",
			},
			paragraph: {
				elementType: "textarea",
				label: "Description",
				elementConfig: {
					type: "text",
				},
				value: "",
			},
		},
		showSuccessBox: false,
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = { ...this.state.composeForm };
		const updatedElement = { ...updatedForm[inputIdentifier] };
		updatedElement.value = event.target.value;
		updatedForm[inputIdentifier] = updatedElement;
		this.setState({ composeForm: updatedForm });
	};

	submitHandler = (event) => {
		event.preventDefault();
		if (this.props.isValid) {
			const article = {
				title: this.state.composeForm.title.value,
				author: this.props.username,
				content: this.state.composeForm.paragraph.value,
			};
			axios
				.post("/articles", article)
				.then((res) => {
					console.log(res);
					this.setState({ showSuccessBox: true });
					setTimeout(() => {
						this.setState({ showSuccessBox: false });
						this.props.history.push("/");
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			this.props.history.push("/login");
		}
		//Check if the use is logged in here or not then post the article
	};

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", function () {
			var elems = document.querySelectorAll(".tap-target");
			var instances = M.TapTarget.init(elems, {});
			instances[0].open();
			setTimeout(() => {
				instances[0].close();
			}, 2000);
		});
	}

	openFeatureDiscovery = () => {
		var elem = document.querySelectorAll(".tap-target");
		var instance = M.TapTarget.init(elem);
		instance[0].open();
		setTimeout(() => {
			instance[0].close();
		}, 4000);
	};

	render() {
		const formElementArry = [];
		for (let key in this.state.composeForm) {
			formElementArry.push({
				id: key,
				config: this.state.composeForm[key],
			});
		}
		return (
			<div>
				<BigHeading>Post New Article</BigHeading>
				{this.state.showSuccessBox ? (
					<div className="center-align">
						<SuccessBox>Your Article will be posted Soon</SuccessBox>
					</div>
				) : null}
				<SizedBox width="100%" height="40px" />
				<form
					className="container center-align"
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
								changed={(event) => this.inputChangedHandler(event, element.id)}
							/>
						);
					})}
					<SubmitButton>Post</SubmitButton>
					<br />
				</form>
				<FeatureDiscovery
					title="Posting an Article"
					description="Once you post an article it will be submitted after sometime"
					iconName="explore"
					clicked={this.openFeatureDiscovery}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.validated ? state.currentUser.name : null,
		isValid: state.validated,
	};
};

export default connect(mapStateToProps)(WriteArticle);
