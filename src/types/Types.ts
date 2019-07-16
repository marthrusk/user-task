export interface IEntity {
	id: number;
}

export class Entity implements IEntity {
	public id: number;

	constructor(data?: IEntity) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}
}

export interface ILoan extends IEntity {
	name: string;
	activeLoansCount: number;
	amount: number;
	annuity: number;
	annuityWithInsurance: number;
	borrowerRelatedInvestmentInfo: any;
	covered: boolean;
	currency: string;
	datePublished: Date;
	deadline: Date;
	fastcash: boolean;
	insuranceActive: boolean;
	insuranceHistory: Array<any>;
	insuredInFuture: boolean;
	interestRate: number;
	investmentRate: number;
	investmentsCount: number;
	mainIncomeType: string;
	multicash: boolean;
	myOtherInvestments: any;
	nickName: string;
	photos: Array<IPhoto>;
	premium: any;
	published: boolean;
	purpose: string;
	questionsAllowed: boolean;
	questionsCount: number;
	rating: string;
	region: string;
	remainingInvestment: number;
	reservedAmount: number;
	revenueRate: number;
	story: string;
	topped: boolean;
	url: string;
	userId: number;
}

export class Loan extends Entity implements ILoan {
	public name: string;
	public activeLoansCount: number;
	public amount: number;
	public annuity: number;
	public annuityWithInsurance: number;
	public borrowerRelatedInvestmentInfo: any;
	public covered: boolean;
	public currency: string;
	public datePublished: Date;
	public deadline: Date;
	public fastcash: boolean;
	public insuranceActive: boolean;
	public insuranceHistory: Array<any>;
	public insuredInFuture: boolean;
	public interestRate: number;
	public investmentRate: number;
	public investmentsCount: number;
	public mainIncomeType: string;
	public multicash: boolean;
	public myOtherInvestments: any;
	public nickName: string;
	public photos: Array<IPhoto>;
	public premium: any;
	public published: boolean;
	public purpose: string;
	public questionsAllowed: boolean;
	public questionsCount: number;
	public rating: string;
	public region: string;
	public remainingInvestment: number;
	public reservedAmount: number;
	public revenueRate: number;
	public story: string;
	public topped: boolean;
	public url: string;
	public userId: number;

	constructor(data?: ILoan) {
		super(data);
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}
}

export interface IPhoto {
	name: string;
	url: string;
}

export class Photo {
	public name: string;
	public url: string;
}
