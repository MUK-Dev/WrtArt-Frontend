import React, { Component } from "react";
import Row from "../../components/Row/Row";
import Paragraph from "../../components/Paragraph/Paragraph";
import ArticleHeading from "../../components/ArticleHeading/ArticleHeading";
import Comment from "../../components/Comment/Comment";
import "./SingleArticle.css";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import SuccessBox from "../../components/SuccessBox/SuccessBox";
import MaterializeSpinnerLarge from "../../components/MaterializeSpinnerLarge/MaterializeSpinnerLarge";
import axios from "../../axios";
import { connect } from "react-redux";

class SingleArticle extends Component {
	state = {
		article: null,
		discussionForm: {
			elementType: "textarea",
			label: "Add to the Discussion",
			elementConfig: {
				type: "text",
			},
			value: "",
		},
		showSuccessBox: false,
	};

	componentDidMount() {
		axios
			.get("/articles/" + this.props.match.params.articleName)
			.then((res) => {
				this.setState({ article: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	inputChangeHandler = (event) => {
		const updatedForm = { ...this.state.discussionForm };
		updatedForm.value = event.target.value;
		this.setState({ discussionForm: updatedForm });
	};

	addCommentHandler = (event) => {
		event.preventDefault();
		if (this.props.isValid) {
			const comment = {
				name: this.props.userName,
				comment: this.state.discussionForm.value,
			};
			axios
				.patch("/articles/" + this.props.match.params.articleName, comment)
				.then((res) => {
					this.setState({ showSuccessBox: true });
					setTimeout(() => {
						this.setState({ showSuccessBox: false });
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			this.props.history.push("/login");
		}
	};

	render() {
		return (
			<div style={{ margin: "30px" }}>
				{this.state.article ? (
					<Row>
						<div className="col s12 m8">
							<ArticleHeading>{this.state.article.title}</ArticleHeading>
							<span className="chip">By: {this.state.article.author}</span>
							<Paragraph>{this.state.article.content}</Paragraph>
							<br />
							<hr className="container" />
							<ArticleHeading>Add to this Article</ArticleHeading>
							<br />
							{this.state.showSuccessBox ? (
								<div className="center-align">
									<SuccessBox>
										Your Suggestion will be added to this article soon
									</SuccessBox>
								</div>
							) : null}
							<form onSubmit={this.addCommentHandler} className="center-align">
								<Input
									elementType={this.state.discussionForm.elementType}
									elementConfig={this.state.discussionForm.elementConfig}
									value={this.state.discussionForm.value}
									label={this.state.discussionForm.label}
									changed={(event) => this.inputChangeHandler(event)}
								/>

								<br />
								<SubmitButton>Post</SubmitButton>
							</form>
						</div>
						<div className="col s12 m4 collapsible CommentBox ">
							<ArticleHeading>Additions</ArticleHeading>
							{this.state.article.additions.length !== 0 ? (
								this.state.article.additions.map((comment) => (
									<Comment
										key={comment._id}
										name={comment.name}
										comment={comment.comment}
									/>
								))
							) : (
								<p className="center-align">No additions to this article yet</p>
							)}
						</div>
					</Row>
				) : (
					<div className="center-align">
						<MaterializeSpinnerLarge />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userName: state.validated ? state.currentUser.name : null,
		isValid: state.validated,
	};
};

export default connect(mapStateToProps)(SingleArticle);
