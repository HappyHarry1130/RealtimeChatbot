interface UserState {
    userName: string;
    userEmail: string;
    planType: string;
}

interface UserAction {
    type: string;
    payload?: {
        userName?: string;
        userEmail?: string;
        planType?: string;
    };
}

const initialState: UserState = {
    userName: '',
    userEmail: '',
    planType: ''
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userName: action.payload?.userName || '',
                userEmail: action.payload?.userEmail || '',
                planType: action.payload?.planType || ''
            };
        case 'LOGOUT':
            return {
                ...state,
                userName: '',
                userEmail: '',
                planType: ''
            };
        default:
            return state;
    }
};

export default userReducer;