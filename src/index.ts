import { BetterEdison } from "./core/better-edison";

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hostname !== "edison.sso.vsb.cz") return;

    const betterEdison = new BetterEdison();
    (window as any)._better_edison_instance = betterEdison;
});