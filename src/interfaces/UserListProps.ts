import type { User } from "./User";

export interface UserListProps {
    users: User[];
    handleEdit: (user: User) => void;
    handleDelete: (id: number) => void;
    loading: boolean;
}