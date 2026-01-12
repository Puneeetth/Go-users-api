export interface User {
    id: number;
    name: string;
    dob: string;
    age?: number;
}

export interface CreateUserRequest {
    name: string;
    dob: string;
}

export interface UpdateUserRequest {
    name: string;
    dob: string;
}
