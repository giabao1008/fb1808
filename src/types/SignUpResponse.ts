export interface SignUpResponse {
    token: string;
    user: {
        name: string;
        email: string;
    }
}
