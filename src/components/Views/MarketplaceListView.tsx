import * as React from "react";
import { IRoutingParams, ViewBase, ViewBaseProps, ViewBaseState } from "../ViewBase";
import { MarketplaceList } from "../marketplace/marketplaceList";
import { History } from "history";

export interface MarketplaceListViewProps extends ViewBaseProps {
	history: History;
}

export interface MarketplaceListRoutingParams extends IRoutingParams {

}

export interface MarketplaceListViewState extends ViewBaseState {

}

export class MarketplaceListView extends ViewBase<MarketplaceListViewProps, MarketplaceListViewState, MarketplaceListRoutingParams> {

	protected renderBody(): React.ReactNode {
		return <MarketplaceList history={this.props.history} />;
	}

	public render(): React.ReactNode {
		return this.renderBody();
	}
}
