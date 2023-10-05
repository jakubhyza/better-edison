import { EdisonApiInstance } from "../types/edison-api-types";
import {
    layoutVisibility,
    scrapAllMenuItems,
    scrapPageInfo,
    scrapUser
} from "./edison-layout";

export const EdisonApi = {
    createInstace: (): EdisonApiInstance | undefined => {
        const pageInfo = scrapPageInfo();
        if (!pageInfo) {
            return;
        }
        if (["/wps/myportal/home"].includes(pageInfo.url)) {
            return;
        }

        return {
            user: scrapUser(),
            layout: {
                setVisibility: layoutVisibility,
            },
            menu: scrapAllMenuItems(),
            page: pageInfo,
        };
    }
};
