import * as React from "react";
import { IDataTableColumn, RendererArgs } from "./Grid";
import { formatDateTime } from "../../../utils/Utils";

export interface GridBodyProps {
	colGroup: Array<React.ReactNode>;
	columns: Array<IDataTableColumn>;
	data: Array<any>;
}

export const GridBody = (props: GridBodyProps): JSX.Element => {
	return <div className="h-table h-table-body-container">
		<table>
			<colgroup>
				{props.colGroup}
			</colgroup>
			<tbody className="h-table h-table-body">
				{
					!props.data
						|| props.data && props.data.length === 0
						? renderNoDataRow()
						: renderGridRow(props)
				}
			</tbody>
		</table>
	</div>;
}

const renderGridRow = (props: GridBodyProps): React.ReactNode => {
	return props.data.map((row, index) => <tr key={index}>{renderGridCell(props, row)}</tr>);
}

const renderGridCell = (props: GridBodyProps, row: any): React.ReactNode => {
	return props.columns.map((column, index) => {
		if (!column.renderer) {
			return <td key={column.field + index}>
				<span>
					{getCellValue(column, row)}
				</span>
			</td>;
		}
		return <td key={column.field + index}>{column.renderer({ item: row } as RendererArgs)}</td>;
	});
}

const getCellValue = (column: IDataTableColumn, row: any): string => {
	const segments = column && column.field.split(".");
	if (segments) {
		let value = row;
		segments.forEach(x => {
			value = value[x];
		});
		if (column.type === "date") {
			return formatDateTime(value);
		}
		return value;
	}
	return row[column.field];
}

//TRANSLATION
const renderNoDataRow = () => {
	return <tr className="h-table h-table-row h-table-row-empty">
		<td><span>NO DATA</span></td>
	</tr>
}
