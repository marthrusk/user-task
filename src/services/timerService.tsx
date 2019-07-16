export interface ITimerService {
	timer(callback: () => void, interval: number);
};

export class TimerService implements ITimerService {
	timer(callback: (args: any) => void, interval: number) {
		setInterval(callback, interval);
	}
}
