import * as React from "react";
import { Layout } from "./components/Layout";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import { MarketplaceListView } from "./components/Views/MarketplaceListView";
import { MarketplaceDetailView, MarketplaceDetailRoutingParams } from "./components/Views/MarketplaceDetailView";

export const routePath: {
	marketplaceDetail: string;
	marketplaceList: string;
} = {
	marketplaceDetail: "/marketplace/detail",
	marketplaceList: "/marketplace"
}

function getFullUrl<TParams>(baseUrl: string, parameters?: TParams): string {
	let result: string = baseUrl;

	if (parameters) {
		Object.getOwnPropertyNames(parameters).forEach((name, index) => {
			if (parameters[name] !== undefined) {
				result += (index === 0 ? "?" : "&") + name + "=" + encodeURIComponent(parameters[name]);
			}
		});
	}

	return result;
}

export function getMarketDetailUrl(id: number): string {
	return getFullUrl<MarketplaceDetailRoutingParams>(routePath.marketplaceDetail, {
		id: id,
	});
}

export const routes: JSX.Element =
	<Layout>
		<Router>
			<Switch>
				<Route exact path={routePath.marketplaceList} component={MarketplaceListView} />
				<Route exact path={routePath.marketplaceDetail} component={MarketplaceDetailView} />

				<Redirect to={routePath.marketplaceList} />
			</Switch>
		</Router>
	</Layout>