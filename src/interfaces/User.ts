/**
 * Interface representing a user entity.
 * Interfaz que representa una entidad de usuario.
 */
export interface User {
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
   * URL of the user's avatar image.
   * URL de la imagen de avatar del usuario.
   */
  avatar: string;
}