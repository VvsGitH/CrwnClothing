import React from "react";
import { Route } from "react-router";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignPage from "./pages/sign-page/sign-page.component";
import Header from "./components/header/header.component";

function App() {
	return (
		<div className='App'>
			<Header />
			<Route exact path='/' component={HomePage} />
			<Route path='/shop' component={ShopPage} />
			<Route path='/sign' component={SignPage} />
		</div>
	);
}

export default App;
