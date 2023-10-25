import { BetterEdison } from "./core/better-edison";
import { MySheduleBePlugin } from "./modules/my-schedule/my-schedule";

const betterEdison = new BetterEdison();
betterEdison.loadModule(MySheduleBePlugin);
