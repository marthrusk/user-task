import { ILoan, Loan } from "./Types";
import { getDuration } from "../utils/Utils";


export interface ILoanEx extends ILoan {
	duration: string;
}

export class LoanEx extends Loan implements ILoanEx {
	public get duration(): string {
		return getDuration(this.datePublished, this.deadline);
	}
}