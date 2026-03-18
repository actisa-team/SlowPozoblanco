export enum UserRole {
    ADMIN = 'ROLE_ADMIN',
    MANAGER = 'ROLE_MANAGER',
    USER = 'ROLE_USER',
}

export interface ICurrentUser {
    userId: string;
    role: UserRole;
    email: string;
}
