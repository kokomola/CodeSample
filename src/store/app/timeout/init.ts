import { setTimeoutFx } from "./index";

setTimeoutFx.use(({ time = 1000, fn }) => {
	setTimeout(fn, time);
});