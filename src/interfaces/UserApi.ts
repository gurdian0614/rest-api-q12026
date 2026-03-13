/**
 * Interface for user data from the API.
 * Interfaz para los datos de usuario desde la API.
 */
export interface UserApi {
    /**
     * Unique identifier for the user.
     * Identificador único del usuario.
     */
    id: number;
    /**
     * User's full name.
     * Nombre completo del usuario.
     */
    name: string;
    /**
     * User's email address.
     * Dirección de correo electrónico del usuario.
     */
    email: string;
    /**
     * User's password (optional).
     * Contraseña del usuario (opcional).
     */
    password?: string;
    /**
     * URL of the user's avatar image.
     * URL de la imagen de avatar del usuario.
     */
    avatar: string;
    /**
     * User's role (optional).
     * Rol del usuario (opcional).
     */
    role?: string;
    /**
     * Creation timestamp (optional).
     * Marca de tiempo de creación (opcional).
     */
    creationAt?: string;
    /**
     * Last update timestamp (optional).
     * Marca de tiempo de última actualización (opcional).
     */
    updatedAt?: string;
}