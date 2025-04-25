import React, { useState, useEffect } from 'react';
import { deletePersonaje, getAllPersonajes } from '../api';

function EliminarPersonaje() {
    const [idEliminar, setIdEliminar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setIdEliminar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePersonaje(idEliminar);
            setMensaje(response.message);
            setError(null);
            setIdEliminar('');
        } catch (error) {
            setError(error.message);
            setMensaje('');
        }
    };

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const data = await getAllPersonajes();
                setPersonajes(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPersonajes();
    }, []);

    if (loading) {
        return <p>Cargando personajes...</p>;
    }

    if (error) {
        return <p>Error al cargar personajes: {error}</p>;
    }

    return (
        <div>
            <h2>Lista de Personajes</h2>
            {personajes.length > 0 ? (
                <ul>
                    {personajes.map(personaje => (
                        <li key={personaje.id}>
                            ID: {personaje.id}, Nombre: {personaje.name}, Email: {personaje.email}, Whatsapp: {personaje.whatsapp}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay personajes registrados.</p>
            )}

            <h2>Eliminar Personaje</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del Personaje a Eliminar:</label>
                    <input type="number" value={idEliminar} onChange={handleChange} required />
                </div>
                <button type="submit">Eliminar Personaje</button>
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

export default EliminarPersonaje;