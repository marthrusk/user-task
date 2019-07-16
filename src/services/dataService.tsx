import { Configuration } from '../configuration';
import { IConstructor } from '../utils/Utils';

class HttpStatusCode {
	static OK = 200;
	static Error = 500;
}

class BaseDataService {
	//probably some environments variables
	protected baseUrl: string = Configuration.API;
	protected createRequestOption(method: string, body?: BodyInit, header?: HeadersInit): RequestInit {
		return {
			method,
			headers: header || this.createDefaultHeader(),
			body: body,
		};
	}
	
	protected createDefaultHeader(): HeadersInit {
		return {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};
	}

	protected createUrl(controllerName: string, path: string = ""): string {
		return this.baseUrl + controllerName + (path ? "/" + path : "");
	}

	protected processResponse<TResult>(response: Response, resultResolver: (data: any) => TResult): Promise<TResult> {
		const status = response.status;
		if (status === HttpStatusCode.OK) {
			return response.text()
				.then((responseText: string) => {
					const data = JSON.parse(responseText);
					return resultResolver(data);
				})
		} else if (status === HttpStatusCode.Error) {
			//some logger, for now just alert
			alert("CHYBA 500");
		}
	}

	protected createListResult<TResult>(constructor: IConstructor<TResult>, data: Array<any>) {
		return data.map(item => new constructor(item));
	}
}

export interface IDataService {
	read<TEntity>(constructor: IConstructor<TEntity>, controller: string, path?: string): Promise<Array<TEntity>>;
	readDetail<TEntity>(constructor: IConstructor<TEntity>, controller: string, id: number, path?: string): Promise<Array<TEntity>>;
};

export class DataService extends BaseDataService implements IDataService {
	read<TEntity>(constructor, controller: string, path?: string) {
		return fetch(this.createUrl(controller, path), this.createRequestOption('GET'))
			.then((response: Response) => this.processResponse<Array<TEntity>>(response,
				data => this.createListResult<TEntity>(constructor, data)));
	}

	readDetail<TEntity>(constructor, controller: string, id: number, path?: string) {
		return fetch(this.createUrl(controller, path), this.createRequestOption('GET'))
			.then((response: Response) => this.processResponse<Array<TEntity>>(response,
				data => this.createListResult<TEntity>(constructor, data)));
	}
}
