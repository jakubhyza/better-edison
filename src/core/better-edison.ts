import { EdisonApi } from "../edison-api/api";
import { EdisonApiInstance } from "../types/edison-api-types"
import { initLayout } from "./better-edison-layout";

export class BetterEdison {
    private edison: EdisonApiInstance;
    constructor() {
        this.edison = EdisonApi.createInstace();
        this.edison.layout.setVisibility(false);
        initLayout(this.edison);
    }
}
