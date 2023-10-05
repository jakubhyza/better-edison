import { EdisonApiInstance } from "../types/edison-api-types";
import {
    layoutVisibility,
    scrapAllMenuItems,
    scrapPageInfo,
    scrapUser
} from "./edison-layout";

export const EdisonApi = {
    createInstace: (): EdisonApiInstance => {
        const pageInfo = scrapPageInfo();
        if (!pageInfo) {
            throw new Error("Page info not found");
        }
        if (["/wps/myportal/home"].includes(pageInfo.url)) {
            throw new Error("Whitelisted page");
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
