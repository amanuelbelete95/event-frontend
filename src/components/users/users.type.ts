export interface UserAPIResponse {
    user_id: string;
    username: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserListResponse {
    users: UserAPIResponse[];
}