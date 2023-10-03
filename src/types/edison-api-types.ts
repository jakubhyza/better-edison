export interface EdisonApiInstance {
    user: EdisonUser,
    layout: LayoutApi,
}

export interface EdisonUser {
    username: string;
    login: string;
    logout: () => void;
}

export interface EdisonLayoutApi {
    headerVisibility: (visible: boolean) => void;
}
