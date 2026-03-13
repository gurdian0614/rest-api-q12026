import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { FormData } from "../interfaces/FormData";
import type { UserApi } from "../interfaces/UserApi";

const useUser = () => {
    const [users, setUsers] = useState<UserApi[]>([]);
    const [userToEdit, setUserToEdit] = useState<UserApi | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        avatar: "https://placehold.co/600x400/004AAD/FFF?text=user+avatar",
        password: "",
    });

    const API_URL = 'https://api.escuelajs.co/api/v1/users';

    /**
     * Fetches the list of users from the API and updates the
     * local state accordingly.
     *
     * Obtiene la lista de usuarios desde la API y actualiza
     * el estado local en consecuencia.
     *
     * No parameters are required / No se requieren parámetros.
     *
     * This method manages the loading indicator, performs a
     * GET request to the endpoint defined in `API_URL`, and
     * stores the resulting array of users in the `users`
     * state variable. In case of an error it shows a
     * SweetAlert2 error message.
     *
     * Este método controla el indicador de carga, realiza una
     * petición GET al endpoint definido en `API_URL` y guarda
     * el arreglo de usuarios resultante en la variable de
     * estado `users`. En caso de error muestra un mensaje de
     * error usando SweetAlert2.
     *
     * @returns {Promise<void>} A promise that resolves once the
     *   data has been fetched (or an error has been handled).
     *   / Una promesa que se resuelve una vez que los datos han
     *   sido obtenidos (o se ha manejado el error).
     *
     * @example
     * // inside a component using the hook:
     * useEffect(() => {
     *   fetchUsers();
     * }, []);
     */
    const fetchUsers = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await axios.get<UserApi[]>(API_URL);
            setUsers(response.data);
        } catch (error) {
            errorAlert('No se pudo cargar los usuarios. Por favor, intente de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Show a success alert using SweetAlert2.
     * Muestra una alerta de éxito usando SweetAlert2.
     *
     * @param message The message text to display.
     * @returns {void}
     */
    const succesAlert = (message: string): void => {
        Swal.fire({
            icon: 'success',
            title: message,
        });
    };

    /**
     * Show an error alert using SweetAlert2.
     * Muestra una alerta de error usando SweetAlert2.
     *
     * @param message The message text to display.
     * @returns {void}
     */
    const errorAlert = (message: string): void => {
        Swal.fire({
            icon: 'error',
            title: message,
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Update formData state when an input value changes.
     * Actualiza el estado formData cuando cambia el valor de
     * un campo de entrada.
     *
     * @param e ChangeEvent<HTMLInputElement> Event object
     *   containing the name and new value of the input.
     * @returns {void}
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handle form submission for creating or updating a user.
     * Maneja el envío del formulario para crear o actualizar un usuario.
     *
     * @param e FormEvent<HTMLFormElement> The form submission event.
     * @returns {Promise<void>} A promise that resolves after the operation completes.
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            if (userToEdit) {
                await axios.put(`${API_URL}/${userToEdit.id}`, {
                    name: formData.name,
                    avatar: formData.avatar,
                });
                succesAlert('Usuario actualizado exitosamente');
            } else {
                await axios.post(API_URL, {
                    ...formData,
                    role: 'customer',
                });
                succesAlert('Usuario creado exitosamente');
            }

            setFormData({
                name: "",
                email: "",
                avatar: "https://placehold.co/600x400/004AAD/FFF?text=user+avatar",
                password: "",
            });
            setUserToEdit(null);
            await fetchUsers();
        } catch (error) {
            errorAlert('Error al guardar o actualizar el usuario. Por favor, intente de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Set the user to edit and populate the form with user data.
     * Establece el usuario a editar y rellena el formulario con los datos del usuario.
     *
     * @param user UserApi The user object to edit.
     * @returns {void}
     */
    const handleEdit = (user: UserApi): void => {
        setUserToEdit(user);
        setFormData({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    }

    /**
     * Handle user deletion with confirmation dialog.
     * Maneja la eliminación de un usuario con diálogo de confirmación.
     *
     * @param userId number The ID of the user to delete.
     * @returns {Promise<void>} A promise that resolves after the operation completes.
     */
    const handleDelete = async (userId: number): Promise<void> => {
        setLoading(true);
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
            });

            if (result.isConfirmed) {
                await axios.delete(`${API_URL}/${userId}`);
                succesAlert('Usuario eliminado exitosamente');
                await fetchUsers();
            }
        } catch (error) {
            errorAlert('Error al eliminar el usuario. Por favor, intente de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }

    return {
        users,
        userToEdit,
        setUserToEdit,
        loading,
        formData,
        setFormData,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
    }
};

export default useUser;