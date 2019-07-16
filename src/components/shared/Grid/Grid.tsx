import * as React from "react";
import { ComponentBaseProps, ComponentBaseState, ComponentBase } from "../../ComponentBase";
import { GridHeader } from "./GridHeader";
import { GridBody } from "./GridBody";
import { ISortable } from "../Infrastructure";

export interface RendererArgs {
	item: any;
}

export interface IDataTableColumn {
	field: string;
	label: string;
	type?: "text" | "date";
	renderer?: (args: RendererArgs) => React.ReactNode;
	disableSorting?: boolean;
}

export interface GridProps extends ISortable, ComponentBaseProps {
	columns: Array<IDataTableColumn>;
	data: Array<any>;
	onFilterChange?: (value: string, direction: string | undefined) => void;
}

export interface GridState extends ComponentBaseState {
	colGroup: Array<React.ReactNode>;
	sortBy: Array<string>;
}

export class Grid extends ComponentBase<GridProps, GridState> {

	public componentDidMount(): void {
		const colGroup = this.renderColGroup();
		this.updateState({ colGroup });
	}

	private renderColGroup(): Array<React.ReactNode> {
		return this.props.columns.map(x => <col key={x.field + x.label} width={`${100 / this.props.columns.length}%`}></col>)
	}

	private onFilterChange = (value: string, direction: string): void => {
		if (!this.props.onFilterChange) {
			console.error("onFilterChange method must be binded")
		} else {
			this.props.onFilterChange(value, direction);
		}
	}

	render(): JSX.Element {
		return <div className="h-table">
			<GridHeader columns={this.props.columns}
				colGroup={this.state.colGroup}
				onFilterChange={this.onFilterChange}
				sortable={this.props.sortable}
			/>
			<GridBody columns={this.props.columns}
				colGroup={this.state.colGroup}
				data={this.props.data}
			/>
		</div>;
	}
}
