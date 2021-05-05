import React, { Component } from "react";
import BigHeading from "../../components/BigHeading/BigHeading";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Row from "../../components/Row/Row";
import ResponsiveColumn from "../../components/ResponsiveColumn/ResponsiveColumn";
import axios from "../../axios";
import MaterializeSpinnerLarge from "../../components/MaterializeSpinnerLarge/MaterializeSpinnerLarge";

export default class Home extends Component {
	state = {
		articles: null,
	};

	componentDidMount() {
		axios
			.get("/articles")
			.then((res) => {
				this.setState({ articles: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		let firstFour;
		this.state.articles
			? (firstFour = [...this.state.articles.reverse().slice(0, 4)])
			: (firstFour = null);
		return (
			<div style={{ width: "100%", padding: "10px" }}>
				<BigHeading key="heading1">Latest 4 Articles</BigHeading>
				{this.state.articles ? (
					<Row>
						{firstFour.map((article) => (
							<ResponsiveColumn key={article._id}>
								<ArticleCard fullArticle={article} />
							</ResponsiveColumn>
						))}
					</Row>
				) : (
					<div className="center-align">
						<MaterializeSpinnerLarge />
					</div>
				)}
				<BigHeading>All Articles</BigHeading>
				{this.state.articles ? (
					<Row>
						{this.state.articles.reverse().map((article) => (
							<ResponsiveColumn key={article._id}>
								<ArticleCard fullArticle={article} />
							</ResponsiveColumn>
						))}
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
