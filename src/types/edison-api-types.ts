export interface EdisonApiInstance {
    user: EdisonUser,
    page: EdisonPageInfo,
    layout: EdisonLayoutApi,
    menu: EdisonMenuItem[],
}

export interface EdisonUser {
    username: string;
    login: string;
    logout: () => void;
}

export interface EdisonLayoutApi {
    setVisibility: (visible: boolean) => void;
}

export interface EdisonMenuItem {
    text: string;
    href: string;
    active: boolean;
    items?: EdisonMenuItem[];
}

export interface EdisonPageInfo {
    id: string;
    visitor: string
    url: string;
    title: string;
    locale: string
    direction: string;
    breadcrumb: string;
    serverNode: string;
}
