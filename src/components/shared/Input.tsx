import * as React from "react";
import { formatDateTime } from "../../utils/Utils";

interface Props {
	title: string;
	value: any;
	onChange?: (value: any) => void;
}

export const Input = (props: Props) => {
	return <div className="h-input-wrapper">
		<span className="h-input-title">{props.title}</span>
		<input className="h-input" defaultValue={resolveValue(props.value)} placeholder="No Data" />
	</div>
}

function resolveValue(value: any): any {
	if (!value) {
		return undefined;
	} else if (Date.parse(value) && typeof value !== "number") {
		return formatDateTime(value);
	} 
	return value;
}