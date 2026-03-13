import type { User } from "./User";

/**
 * Props interface for the UserList component.
 * Interfaz de props para el componente UserList.
 */
export interface UserListProps {
    /**
     * Array of users to display.
     * Arreglo de usuarios a mostrar.
     */
    users: User[];
    /**
     * Handler for editing a user.
     * Manejador para editar un usuario.
     */
    handleEdit: (user: User) => void;
    /**
     * Handler for deleting a user by ID.
     * Manejador para eliminar un usuario por ID.
     */
    handleDelete: (id: number) => void;
    /**
     * Loading state indicator.
     * Indicador de estado de carga.
     */
    loading: boolean;
}