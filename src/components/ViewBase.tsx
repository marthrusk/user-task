import * as React from "react";
import { ComponentBase, ComponentBaseProps, ComponentBaseState } from "./ComponentBase";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";

export interface ViewBaseProps extends ComponentBaseProps, RouteComponentProps<{}>  {

}

export interface IRoutingParams {

}

export interface ViewBaseState extends ComponentBaseState{

}

export class ViewBase<
	TProps extends ViewBaseProps = ViewBaseProps,
	TState extends ViewBaseState = ViewBaseState,
	TParams extends IRoutingParams = IRoutingParams
	> extends ComponentBase<TProps, TState> {
	public constructor(props: TProps) {
		super(props);
		this.state = this.buildState() as TState;
	}

	protected get parameters(): TParams {
		const params = this.getParametersFromProps(this.props) as any;
		return { ...params } as TParams;
	}

	protected getParametersFromProps(props: ViewBaseProps) {
		return queryString.parse(props.location.search);
	}

	protected renderBody(): React.ReactNode {
		return null;
	}

	public render(): React.ReactNode {
		return this.renderBody();
	}
}
