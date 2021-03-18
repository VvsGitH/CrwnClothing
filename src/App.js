import React from "react";
import { Route } from "react-router";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
	return (
		<div>
			<Header />
			<Route exact path='/' component={HomePage} />
			<Route path='/shop' component={ShopPage} />
		</div>
	);
}

export default App;
