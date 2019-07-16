import * as React from "react";
import { ComponentBaseProps, ComponentBaseState, ComponentBase } from "./ComponentBase";
import { ApplicationCore } from "../ApplicationCore";
import { Grid, IDataTableColumn } from "./shared/Grid/Grid";
import { History } from "history";
import * as Types from './../types/Types';
import _ from "lodash";
import { IConstructor } from "../utils/Utils";

export interface ListBaseProps<TEntity> extends ComponentBaseProps {
	history: History;
}

export interface ListBaseState<TEntity> extends ComponentBaseState {
	data: Array<TEntity>;
	defaultOrderedData: Array<TEntity>;
	columns: Array<IDataTableColumn>;
	sortable: boolean;
}

export class ListBase<
	TProps extends ListBaseProps<TEntity>,
	TState extends ListBaseState<TEntity>,
	TEntity extends Types.IEntity
	> extends ComponentBase<TProps, TState> {

	private readonly _constructor: IConstructor<TEntity>;

	constructor(props, constructor: IConstructor<TEntity>) {
		super(props);
		this._constructor = constructor;
	}

	protected buildState(): ListBaseState<TEntity> {
		return {
			...super.buildState(),
			data: new Array<TEntity>(),
			defaultOrderedData: new Array<TEntity>(),
			columns: new Array<IDataTableColumn>(),
			sortable: false
		}
	}


	protected getDetailUrl(id: number): string {
		throw new Error("getDetailUrl function is not implemented");
	}

	protected goToDetail = (id: number): void => {
		this.props.history.push(this.getDetailUrl(id));
	}

	protected getColumns(): Array<IDataTableColumn> {
		throw new Error("getColumns function is not implemented");
	}

	protected controllerApi(): string {
		throw new Error("controllerApi function is not implemented");
	}

	protected controllerPath(): string {
		return "";
	}

	protected loadData = () => {
		return ApplicationCore.dataService.read(this._constructor, this.controllerApi(), this.controllerPath())
			.then((data: Array<TEntity>) => this.updateState({ data: data, defaultOrderedData: data }))
			.catch(error => console.log(error));
	}

	public componentDidMount() {
		this.loadData();
	}

	protected onFilterChange = (filteredBy: string, direction: any) => {
		const data = _.cloneDeep(this.state.data);
		const result = _.orderBy(data, filteredBy, direction);
		if (direction === undefined) {
			this.updateState({ data: this.state.defaultOrderedData });
		} else {
			this.updateState({ data: result });
		}
	}

	protected renderBody(): React.ReactNode {
		return <Grid data={this.state.data}
			onFilterChange={this.onFilterChange}
			sortable={this.state.sortable}
			columns={this.getColumns()} />
	}

	public render(): React.ReactNode {
		return this.renderBody();
	}
}
