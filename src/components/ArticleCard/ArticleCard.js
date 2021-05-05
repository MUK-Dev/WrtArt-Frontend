import React from "react";
import RouteButton from "../RouteButton/RouteButton";
import "./ArticleCard.css";

const articleCard = (props) => (
	<div className="card center-align CardAnimation indigo lighten-5">
		<div className="card-content white-text">
			<span className="card-title" style={{ color: "black" }}>
				{props.fullArticle.title}
			</span>
			<span className="chip">By: {props.fullArticle.author}</span>
			<br />
			<RouteButton link={"/article/" + props.fullArticle._id}>
				View Full Article
			</RouteButton>
		</div>
	</div>
);

export default articleCard;
