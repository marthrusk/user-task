import { ApplicationCore } from '../../ApplicationCore';
import * as TypesEx from "../../types/TypesEx";

const promise = ApplicationCore.dataService.read(TypesEx.LoanEx, "loans", "marketplace");

test("Check if data load", () => {
	return promise.then(data => {
		expect(data.length).toBeGreaterThanOrEqual(0)
	})
})


test("Check if interval function working", () => {
	return ApplicationCore.timerService.timer(() => { expect("").toBeCalledTimes(2) }, 1000)
})