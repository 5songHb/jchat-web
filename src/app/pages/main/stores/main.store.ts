export interface MainStore{
    selfInfo: {
        info: {
            avatar: string;
            avatarUrl: string;
        },
        show: boolean;
    };
    listTab: number;
    createGroup: {
        show: boolean;
        info: object;
    };
    logoutShow: boolean;
    modifyPasswordShow: boolean;
    searchUserResult: {
        result: {
            groupArr: Array<any>;
            singleArr: Array<any>;
        },
        isSearch: boolean;
    };
    actionType: string;
    tipModal: object;
    createSingleChat: object;
    blackMenu: {
        menu: Array<any>;
        show: boolean;
    };
    createGroupSearch: {
        info: object;
    }
}