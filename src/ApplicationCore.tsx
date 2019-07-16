import { DataService, IDataService } from "./services/dataService";
import { ITimerService, TimerService } from "./services/timerService";

export class ApplicationCore {
	static _instance: ApplicationCore;
	_dataService: IDataService;
	_timerService: ITimerService;

	constructor() {
		this._dataService = new DataService();
		this._timerService = new TimerService();
	}

	static get instance(): ApplicationCore {
		if (!ApplicationCore._instance) {
			ApplicationCore._instance = new ApplicationCore();
		}
		return ApplicationCore._instance;
	}

	static get dataService(): IDataService {
		return ApplicationCore.instance._dataService;
	}

	static get timerService(): ITimerService {
		return ApplicationCore.instance._timerService;
	}
}
