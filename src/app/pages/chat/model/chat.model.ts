export const chatInit = {
    conversation: [],
    messageList: [],
    newMessage: {},
    groupList: [],
    activePerson: {
        key: '',
        name: '',
        nickName: '',
        activeIndex: -1,
        noDisturb: false,
        avatarUrl: ''
    },
    imageViewerUrl: '',
    defaultPanelIsShow: true,
    actionType: '',
    otherInfo: {
        info: {},
        show: false
    },
    blackMenu: {
        menu: [],
        show: false
    },
    searchUserResult: {
        result: {},
        isSearch: false
    },
    recentMsg: [],
    msgId: [],
    groupDeacriptionShow: false,
    selfInfo: {
        info: {
            avatarUrl: ''
        }
    }
}