import * as React from "react";
import { ComponentBaseProps, ComponentBaseState, ComponentBase } from "./ComponentBase";
import { ApplicationCore } from "../ApplicationCore";
import { History } from "history";
import * as Types from './../types/Types';
import { IConstructor } from "../utils/Utils";

export interface DetailBaseProps<TEntity> extends ComponentBaseProps {
	id: number;
	history?: History;
}

export interface DetailBaseState<TEntity> extends ComponentBaseState {
	detail: TEntity;
}

export class DetailBase<
	TProps extends DetailBaseProps<TEntity>,
	TState extends DetailBaseState<TEntity>,
	TEntity extends Types.IEntity
	> extends ComponentBase<TProps, TState> {

	private readonly _constructor: IConstructor<TEntity>;

	constructor(props, constructor: IConstructor<TEntity>) {
		super(props);
		this._constructor = constructor;
	}

	protected buildState(): DetailBaseState<TEntity> {
		return {
			...super.buildState(),
			detail: {} as TEntity,
		}
	}

	protected controllerApi(): string {
		throw new Error("controllerApi function is not implemented");
	}

	protected controllerPath(): string {
		return "";
	}

	public componentDidMount() {
		ApplicationCore.dataService.readDetail(this._constructor, this.controllerApi(), this.props.id, this.controllerPath())
			.then((data: Array<TEntity>) => {
				const detail = data.find(x => x.id == this.props.id);
				this.updateState({ detail: detail });
			})
			.catch(error => console.log(error));
	}

	protected renderBody(): React.ReactNode {
		return null;
	}

	public render(): React.ReactNode {
		if (this.state.detail) {
			return this.renderBody();
		}
		return null;
	}
}
