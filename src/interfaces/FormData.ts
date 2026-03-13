/**
 * Interface for form data used in user creation/editing.
 * Interfaz para los datos del formulario usados en la creación/edición de usuarios.
 */
export interface FormData {
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
  /**
   * User's password (optional for updates).
   * Contraseña del usuario (opcional para actualizaciones).
   */
  password?: string;
}