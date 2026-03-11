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

    return {
        users,
        userToEdit,
        setUserToEdit,
        loading,
        formData,
        setFormData,
        handleInputChange,
    }
};

export default useUser;