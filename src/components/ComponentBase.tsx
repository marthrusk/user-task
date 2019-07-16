import * as React from "react";

export interface ComponentBaseProps {

}

export interface ComponentBaseState {

}

export class ComponentBase<
	TProps extends ComponentBaseProps = ComponentBaseProps,
	TState extends ComponentBaseState = ComponentBaseState
	> extends React.Component<TProps, TState> {
	public constructor(props: TProps) {
		super(props);

		this.state = this.buildState() as TState;
	}

	protected buildState(): ComponentBaseState {
		return { };
	}

	protected updateState<TKeys extends keyof TState>(newValues: Pick<TState, TKeys>, callback?: () => void) {
		this.setState(prevState => { return Object.assign(Object.assign({}, prevState), newValues); }, callback);
	}
}
