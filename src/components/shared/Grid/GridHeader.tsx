import * as React from "react";
import { IDataTableColumn } from "./Grid";
import { ISortable } from "../Infrastructure";

export interface GridHeaderProps extends ISortable {
	colGroup: Array<React.ReactNode>;
	columns: Array<IDataTableColumn>;
	onFilterChange: (value: string, direction: string | undefined) => void;
}

export const GridHeader = (props: GridHeaderProps): JSX.Element => {
	//lepší optimalizace
	const [direction, setDirection] = React.useState("asc");
	const [orderedBy, setOrder] = React.useState();

	return <div className="h-table h-table-head-container">
		<table>
			<colgroup>
				{props.colGroup}
			</colgroup>
			<thead className="h-table h-table-head">
				<tr onClick={(e) => props.sortable && sortBy(e, props, direction, setDirection, orderedBy, setOrder)} children={renderGridHeader(props, direction, orderedBy)} />
			</thead>
		</table>
	</div>;
}

const renderGridHeader = (props: GridHeaderProps, direction: string | undefined, orderedBy: string | undefined): React.ReactNode => {
	return props.columns.map((cell, index) => {
		let className = "h-cell";
		if (!cell.disableSorting) {
			className = `${className} h-sortable`;
		}
		if (orderedBy === cell.field) {
			className = setHeaderDirectionClassName(className, direction);
		}
		return <th className={className} id={cell.field} key={cell.field + index}>{cell.label}</th>
	});
}

function sortBy(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, props: GridHeaderProps,
	direction: string | undefined, setDirection: React.Dispatch<string | undefined>,
	orderedBy: string | undefined, setOrder: React.Dispatch<string | undefined>) {

	const node = event.target as HTMLTableRowElement;
	const attribute = node.attributes.getNamedItem("id");
	const column = props.columns.find(x => x.field === attribute.nodeValue);

	if (column && column.disableSorting) {
		event.preventDefault();
		return;
	}

	const value = attribute.nodeValue;
	setCorrectDirection(direction, setDirection);
	setOrder(value);
	props.onFilterChange(value, direction);
}

function setHeaderDirectionClassName(className: string, direction: string | undefined): string {
	switch (direction) {
		case "asc":
			return `${className} h-asc`;
		case "desc":
			return `${className} h-desc`;
		default:
			return className;
	}
}

function setCorrectDirection(direction: string | undefined, setDirection: React.Dispatch<string | undefined>) {
	switch (direction) {
		case "asc":
			setDirection("desc");
			break;
		case "desc":
			setDirection(undefined);
			break;
		default:
			setDirection("asc");
			break;
	}
}
