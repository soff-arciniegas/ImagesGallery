import axios from 'axios';
import { searchImages, toggleLikeImage, API_URL_BASE } from '../apiServices';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('apiServices', () => {

    describe('searchImages', () => {
        const mockData = [
            {
                "type": "Image",
                "id": 2,
                "title": "Grey beach",
                "price": 43,
                "author": "Mary Robinette",
                "created_at": "2012-12-12T21: 08: 20Z",
                "main_attachment": {
                    "big": "https://picsum.photos/id/100/600",
                    "small": "https://picsum.photos/id/100/300"
                },
                "likes_count": 1,
                "liked": false,
                "links": [
                    {
                        "rel": "avatar",
                        "uri": "http://lorempixel.com/250/250/",
                        "methods": "GET"
                    },
                    {
                        "rel": "like",
                        "uri": "http://localhost:3100/images/2/likes",
                        "methods": "POST"
                    }
                ]
            },
        ];

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should return data when API call is successful', async () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: mockData,
                status: 200,
            });

            const result = await searchImages('beach', 1);

            expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL_BASE}/images`, {
                params: { search: 'beach', page: 1 },
            });
            expect(result).toEqual({
                success: true,
                data: mockData,
                message: '',
            });
        });


        test('should handle API error response correctly', async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: { status: 404, error: 'Not Found', message: 'Not Found' },
            });

            const result = await searchImages('beach');

            expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL_BASE}/images`, {
                params: { search: 'beach', page: 1 },
            });

            expect(result).toEqual({
                success: false,
                status: 404,
                data: null,
                message: 'Not Found',
            });

        });


        test('should handle network error correctly', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

            const result = await searchImages('beach');

            expect(result).toEqual({
                success: false,
                message: 'Error en la petición',
                status: 500,
                data: null,
            });
        });
    });

    describe('toggleLikeImage', () => {
        const mockResponse = { liked: true, likes_count: 11 };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should return data when API call is successful', async () => {
            mockedAxios.post.mockResolvedValueOnce({
                data: mockResponse,
                status: 204,
            });

            const result = await toggleLikeImage(1);

            expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL_BASE}/images/1/likes`);
            expect(result).toEqual({
                success: true,
                data: mockResponse,
                status: 204,
                message: '',
            });
        });

        test('should handle API error response correctly', async () => {
            mockedAxios.post.mockRejectedValueOnce({
                response: { status: 500, data: { message: 'Internal Server Error' } },
            });

            const result = await toggleLikeImage(1);

            expect(result).toEqual({
                success: false,
                status: 500,
                data: null,
                message: 'Error al consumir la API',
            });
        });

        test('should handle no response error correctly', async () => {
            mockedAxios.post.mockRejectedValueOnce({
                request: {},
            });

            const result = await toggleLikeImage(1);

            expect(result).toEqual({
                success: false,
                message: 'No se recibió respuesta de la API',
                status: 500,
                data: null,
            });
        });
    });
});
