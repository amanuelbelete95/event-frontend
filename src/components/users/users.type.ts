export interface UserAPIResponse {
    id: string;
    username: string;
    role: string;
}

export interface UserListResponse {
    users: UserAPIResponse[];
}