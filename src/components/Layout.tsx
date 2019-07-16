import * as React from "react";

interface Props {
	children: React.ReactNode;
}

export const Layout = (props: Props) => {
	return <div className="h-layout">
		{props.children}
	</div>;
}