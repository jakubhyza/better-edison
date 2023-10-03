import { EdisonApiInstance } from "../types/edison-api-types";
import { headerVisibility, scrapUser } from "./edison-layout";

export const EdisonApi = {
    createInstace: (): EdisonApiInstance => {
        return {
            user: scrapUser(),
            layout: {
                headerVisibility,
            },
        };
    }
};