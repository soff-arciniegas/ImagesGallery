import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageGallery from '../ImageGallery';
import * as useImagesHook from '../../hooks/useImages';
import '@testing-library/jest-dom';
import 'intersection-observer';


jest.mock('../../hooks/useImages');

describe('ImageGallery Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders images correctly when data is fetched', async () => {
        const mockItems = [
            {
                id: 1,
                title: 'Image 1',
                price: 100,
                author: 'Author 1',
                main_attachment: { big: 'big-img-1.jpg', small: 'small-img-1.jpg' },
                likes_count: 10,
                liked: false,
            },
            {
                id: 2,
                title: 'Image 2',
                price: 200,
                author: 'Author 2',
                main_attachment: { big: 'big-img-2.jpg', small: 'small-img-2.jpg' },
                likes_count: 20,
                liked: true,
            },
        ];

        (useImagesHook.default as jest.Mock).mockReturnValue({
            items: mockItems,
            handleSearch: jest.fn(),
            likeImage: jest.fn(),
            error: false,
            loadMoreImages: jest.fn(),
            isLoading: false,
            hasMoreImages: true,
        });

        render(<ImageGallery />);

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images.length).toBe(2);
        });

        expect(screen.getByText('Image 1')).toBeInTheDocument();
        expect(screen.getByText('Image 2')).toBeInTheDocument();
    });

    test('renders loading state', () => {
        (useImagesHook.default as jest.Mock).mockReturnValue({
            items: [],
            handleSearch: jest.fn(),
            likeImage: jest.fn(),
            error: false,
            loadMoreImages: jest.fn(),
            isLoading: true,
            hasMoreImages: true,
        });

        render(<ImageGallery />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders NotFound component when there is an error o is not data', () => {
        (useImagesHook.default as jest.Mock).mockReturnValue({
            items: [],  
            handleSearch: jest.fn(),
            likeImage: jest.fn(),
            error: true,  
            loadMoreImages: jest.fn(),
            isLoading: false,
            hasMoreImages: false,
        });
    
        render(<ImageGallery />);
    
        const notFoundImage = screen.getByAltText(/No results found/i); 
    
        expect(notFoundImage).toBeInTheDocument(); 
    });

    test('triggers loadMoreImages when inView is true', async () => {
        const loadMoreImagesMock = jest.fn();

        (useImagesHook.default as jest.Mock).mockReturnValue({
            items: [],
            handleSearch: jest.fn(),
            likeImage: jest.fn(),
            error: false,
            loadMoreImages: loadMoreImagesMock,
            isLoading: false,
            hasMoreImages: true,
        });

        render(<ImageGallery />);

        fireEvent.scroll(window, { target: { scrollingElement: { scrollHeight: 1000 } } });

        await waitFor(() => {
            expect(loadMoreImagesMock).toHaveBeenCalledTimes(1); 
        });
    });
});
