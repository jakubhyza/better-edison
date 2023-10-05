import { EdisonApi } from "../edison-api/api";
import { EdisonApiInstance } from "../types/edison-api-types"
import { initLayout } from "./better-edison-layout";

export class BetterEdison {
    private edison: EdisonApiInstance | undefined;
    constructor() {
        this.edison = EdisonApi.createInstace();
        if (!this.edison) {
            return;
        }

        console.log(`------------------------\n[Better Edison]\ndev 0.1\n------------------------`)

        this.edison.layout.setVisibility(false);
        initLayout(this.edison);
    }

    get isEdison(): boolean {
        return !!this.edison;
    }
}
