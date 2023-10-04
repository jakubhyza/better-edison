import { EdisonApi } from "../edison-api/api";
import { EdisonApiInstance } from "../types/edison-api-types"

export class BetterEdison {
    private edison: EdisonApiInstance;
    constructor() {
        this.edison = EdisonApi.createInstace();
        this.edison.layout.setVisibility(false);

        console.log(this.edison.page);
    }
}
