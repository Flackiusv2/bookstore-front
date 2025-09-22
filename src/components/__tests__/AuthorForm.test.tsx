import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthorForm from '../AuthorForm';

describe('AuthorForm', () => {
  test('renderiza campos requeridos: name, description, birthDate, image', async () => {
    render(<AuthorForm onSubmit={jest.fn()} submitLabel="Crear" />);

    // Campos por etiqueta
    const nameInput = screen.getByLabelText(/nombre/i);
    const descriptionTextarea = screen.getByLabelText(/descripción/i);
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const imageInput = screen.getByLabelText(/url de imagen/i);

    // Botón de envío
    const submitButton = screen.getByRole('button', { name: /crear/i });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Listos para interacción
    expect(nameInput).toBeEnabled();
    expect(descriptionTextarea).toBeEnabled();
    expect(birthDateInput).toBeEnabled();
    expect(imageInput).toBeEnabled();
  });

  test('no permite enviar con campos requeridos vacíos y deshabilita el botón', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<AuthorForm onSubmit={onSubmit} submitLabel="Crear" />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const submitButton = screen.getByRole('button', { name: /crear/i });

    // Por defecto, el botón debe estar deshabilitado porque los campos requeridos están vacíos
    expect(submitButton).toBeDisabled();

    // Intentar enviar (presionando Enter en un input o click en el botón)
    await user.click(submitButton);

    // No debe llamar al submit
    expect(onSubmit).not.toHaveBeenCalled();

    // Completar solo uno de los requeridos y verificar que sigue deshabilitado
    await user.type(nameInput, 'Gabriel García Márquez');
    expect(submitButton).toBeDisabled();

    // Completar el otro requerido -> botón habilitado
    await user.type(birthDateInput, '1927-03-06');
    expect(submitButton).toBeEnabled();

    // Enviar ahora sí debe llamar onSubmit
    await user.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
