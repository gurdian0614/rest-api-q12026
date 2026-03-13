import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { FormData } from "./FormData";

/**
 * Props interface for the UserForm component.
 * Interfaz de props para el componente UserForm.
 */
export interface UserFormProps {
    /**
     * Current form data.
     * Datos actuales del formulario.
     */
    formData: FormData;
    /**
     * Function to update form data.
     * Función para actualizar los datos del formulario.
     */
    setFormData: Dispatch<SetStateAction<FormData>>;
    /**
     * Handler for input changes.
     * Manejador para cambios en los inputs.
     */
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Handler for form submission.
     * Manejador para el envío del formulario.
     */
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    /**
     * User currently being edited (if any).
     * Usuario actualmente en edición (si existe).
     */
    userToEdit: any;
    /**
     * Function to set the user to edit.
     * Función para establecer el usuario a editar.
     */
    setUserToEdit: Dispatch<SetStateAction<any>>;
    /**
     * Loading state indicator.
     * Indicador de estado de carga.
     */
    loading: boolean;
}