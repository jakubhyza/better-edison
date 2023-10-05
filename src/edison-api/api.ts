import { EdisonApiInstance } from "../types/edison-api-types";
import {
    layoutVisibility,
    scrapAllMenuItems,
    scrapLocaleChangeLink,
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

        const user = scrapUser();
        if (!user) return;

        return {
            user: user,
            layout: {
                setVisibility: layoutVisibility,
                switchLocale: () => window.location.href = scrapLocaleChangeLink() ?? '#',
            },
            menu: scrapAllMenuItems(),
            page: pageInfo,
        };
    }
};
