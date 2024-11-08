interface UserPayload {
    userName: string;
    userEmail: string;
    planType: string;
}

const Logout = (payload: Partial<UserPayload>) => {
    return {
        type: 'LOGOUT',
        payload,
    };
};

const Login = (payload: UserPayload) => {
    return {
        type: 'LOGIN',
        payload,
    };
};

export { Login, Logout };