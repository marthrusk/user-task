import * as React from "react";
import { ListBaseProps, ListBaseState, ListBase } from "../ListBase";
import * as TypesEx from "../../types/TypesEx";
import { IDataTableColumn, RendererArgs } from "../shared/Grid/Grid";
import * as Routes from "../../routes";
import { ApplicationCore } from "../../ApplicationCore";
import { Configuration } from "../../configuration";
import { getDuration } from "../../utils/Utils";

export interface MarketplaceListProps extends ListBaseProps<TypesEx.LoanEx> {
}

export interface MarketplaceListState extends ListBaseState<TypesEx.LoanEx> {

}

export class MarketplaceList extends ListBase<MarketplaceListProps, MarketplaceListState, TypesEx.LoanEx> {
	constructor(props) {
		super(props, TypesEx.LoanEx);
	}

	protected buildState(): MarketplaceListState {
		return {
			...super.buildState(),
			sortable: true
		}
	}

	protected getColumns(): Array<IDataTableColumn> {
		return [
			{
				label: "Action",
				field: "",
				disableSorting: true,
				renderer: (args: RendererArgs) => {
					return this.renderActionColumn(args.item)
				}
			},
			{
				label: "Image",
				field: "photo.url",
				disableSorting: true,
				renderer: (args: RendererArgs) => {
					return this.renderImageColumn(args.item)
				}
			},
			{
				label: "name",
				field: "name",
				disableSorting: true,
			},
			{
				label: "duration",
				field: "duration",
				renderer: (args: RendererArgs) => {
					return this.renderDurationColumn(args.item)
				}
			},
			{
				label: "rating",
				field: "rating",
			},
			{
				label: "deadline",
				field: "deadline",
				type: "date"
			},
			{
				label: "amount",
				field: "amount",
			},
			{
				label: "story",
				field: "story",
				disableSorting: true,
				renderer: (args: RendererArgs) => {
					return this.renderStoryColumn(args.item)
				}
			}
		];
	}

	protected getDetailUrl(id: number): string {
		return Routes.getMarketDetailUrl(id);
	}

	private getTimer(seconds: number): number {
		return 1000 * seconds;
	}

	public componentDidMount() {
		super.componentDidMount();
		ApplicationCore.timerService.timer(this.loadData, this.getTimer(300));
	}

	protected renderImageColumn(item: TypesEx.LoanEx): React.ReactNode {
		if (item.photos.length > 0) {
			const photo = item.photos[0];
			return <img src={`${Configuration.API}${photo.url}`} alt={photo.name} width={100} />;
		}
		return null;
	}

	private renderStoryColumn(item: TypesEx.LoanEx): React.ReactNode {
		const maxAllowedStringLength = 200;
		const maxAllowedWordLength = 20

		const story = item.story.split(/[\s]+/);

		if (story.length > maxAllowedWordLength || item.story.length > maxAllowedStringLength) {
			return <span>{story.slice(0, maxAllowedWordLength).join(" ").substr(0, maxAllowedStringLength)}</span>;		 
		}

		return <span>{item.story}</span>;
	}

	protected renderActionColumn(item: TypesEx.LoanEx): React.ReactNode {
		return <button className="h-button" onClick={() => this.goToDetail(item.id)}>detail</button>
	}

	protected renderDurationColumn(item: TypesEx.LoanEx): React.ReactNode {
		return <span>{getDuration(item.datePublished, item.deadline)}</span>
	}

	protected controllerApi(): string {
		return "loans";
	}

	protected controllerPath(): string {
		return "marketplace";
	}
}
