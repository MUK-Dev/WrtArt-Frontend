import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import { Route } from "react-router";
import Home from "./containers/Home/Home";
import WriteArticle from "./containers/WriteArticle/WriteArticle";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import SingleArticle from "./containers/SingleArticle/SingleArticle";

class App extends Component {
	render() {
		return (
			<Layout>
				<Route path="/" exact component={Home} />
				<Route path="/writeArticle" exact component={WriteArticle} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/article/:articleName" exact component={SingleArticle} />
			</Layout>
		);
	}
}

export default App;
