import axios from 'axios';


export const API_URL_BASE = 'http://localhost:3100'

const handleApiError = (error: any) => {
    if (error.response) {
        return {
            success: false,
            status: error.response.status,
            data: null, 
            message: error.response.message || 'Error al consumir la API',
        };
    } else if (error.request) {
        return { success: false, message: 'No se recibió respuesta de la API', status: 500 ,  data: null};
    } else {
        return { success: false, message: 'Error en la petición', status: 500, data: null };
    }
};


export const searchImages = async (searchTerm: string, page = 1) => {
    try {
        const response = await axios.get(`${API_URL_BASE}/images`, {
            params: {
                search: searchTerm,
                page,
            },
        });
        return { success: true, data: response.data , message: ""};
    } catch (error) {
        return handleApiError(error);
    }
};


export const toggleLikeImage = async (imageId: number) => {
    try {
        const response = await axios.post(`${API_URL_BASE}/images/${imageId}/likes`);
        return { success: true, data: response.data, status: response.status, message: "" };
    } catch (error) {
        return handleApiError(error);
    }
};