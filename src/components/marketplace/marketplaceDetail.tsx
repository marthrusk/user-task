import * as React from "react";
import { DetailBaseProps, DetailBaseState, DetailBase } from "../DetailBase";
import * as Types from "../../types/Types";
import { Input } from "../shared/Input";
import * as TypesEx from "../../types/TypesEx";

export interface MarketplaceDetailProps extends DetailBaseProps<Types.Loan> {

}

export interface MarketplaceDetailState extends DetailBaseState<Types.Loan> {

}

export class MarketplaceDetail extends DetailBase<MarketplaceDetailProps, MarketplaceDetailState, Types.Loan> {
	constructor(props) {
		super(props, TypesEx.LoanEx);
	}

	protected controllerApi(): string {
		return "loans";
	}

	protected controllerPath(): string {
		return "marketplace";
	}
	 
	protected renderBody(): React.ReactNode {
		const { detail } = this.state;
		return <React.Fragment>
			<div className="h-row-3">
				<Input title="name" value={detail.name} />
				<Input title="activeLoansCount" value={detail.activeLoansCount} />
				<Input title="amount" value={detail.amount} />
			</div>
			<div className="h-row-3">
				<Input title="annuity" value={detail.annuity} />
				<Input title="annuityWithInsurance" value={detail.annuityWithInsurance} />
				<Input title="borrowerRelatedInvestmentInfo" value={detail.borrowerRelatedInvestmentInfo} />
			</div>
			<div className="h-row-3">
				<Input title="currency" value={detail.currency} />
				<Input title="datePublished" value={detail.datePublished} />
				<Input title="deadline" value={detail.deadline} />
			</div>
			<div className="h-row-3">
				<Input title="interestRate" value={detail.interestRate} />
				<Input title="investmentRate" value={detail.investmentRate} />
				<Input title="investmentsCount" value={detail.investmentsCount} />
			</div>
			<div className="h-row-3">
				<Input title="mainIncomeType" value={detail.mainIncomeType} />
				<Input title="nickName" value={detail.nickName} />
				<Input title="premium" value={detail.premium} />
			</div>
			<div className="h-row-3">
				<Input title="purpose" value={detail.purpose} />
				<Input title="questionsAllowed" value={detail.questionsAllowed} />
				<Input title="questionsCount" value={detail.questionsCount} />
			</div>
			<div className="h-row-3">
				<Input title="rating" value={detail.rating} />
				<Input title="region" value={detail.region} />
				<Input title="remainingInvestment" value={detail.remainingInvestment} />
			</div>
			<div className="h-row-3">
				<Input title="reservedAmount" value={detail.reservedAmount} />
				<Input title="revenueRate" value={detail.revenueRate} />
				<Input title="story" value={detail.story} />
			</div>
			<div className="h-row-3">
				<Input title="url" value={detail.url} />
				<Input title="userId" value={detail.userId} />
			</div>
		</React.Fragment>;
	}
}
