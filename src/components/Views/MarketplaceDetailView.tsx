import * as React from "react";
import { IRoutingParams, ViewBase, ViewBaseProps, ViewBaseState } from "../ViewBase";
import { MarketplaceDetail } from "../marketplace/marketplaceDetail";
import { History } from "history";

export interface MarketplaceDetailViewProps extends ViewBaseProps {
	history: History;
}

export interface MarketplaceDetailRoutingParams extends IRoutingParams {
	id: number;
}

export interface MarketplaceDetailViewState extends ViewBaseState {

}

export class MarketplaceDetailView extends ViewBase<MarketplaceDetailViewProps, MarketplaceDetailViewState, MarketplaceDetailRoutingParams> {

	protected renderBody(): React.ReactNode {
		return <MarketplaceDetail history={this.props.history} id={this.parameters.id} />;
	}

	public render(): React.ReactNode {
		return <div className="h-view-detail"> {this.renderBody()} </div>;
	}
}
