import { render, screen, fireEvent } from '@testing-library/react';
import CardItem from '../CardItem';
import { Image } from '../../types/interfaces';
import '@testing-library/jest-dom';
import useMediaQuery from '@mui/material/useMediaQuery';



const mockOnLike = jest.fn();
jest.mock('@mui/material/useMediaQuery', () => jest.fn());


const mockImage: Image = {
    id: 2,
    title: 'Grey beach',
    author: 'Mary Robinette',
    price: 43,
    liked: false,
    likes_count: 1,
    main_attachment: {
        big: 'https://picsum.photos/id/100/600',
        small: 'https://picsum.photos/id/100/300',
    },
};

describe('CardItem Component', () => {
    beforeEach(() => {
        mockOnLike.mockClear();
    });

    test('renders the card with correct content big', () => {
        render(<CardItem image={mockImage} onLike={mockOnLike} />);

        expect(screen.getByText('Grey beach')).toBeInTheDocument();
        expect(screen.getByText('By Mary Robinette')).toBeInTheDocument();
        expect(screen.getByText('Price: 43')).toBeInTheDocument();

        expect(screen.getByText('1')).toBeInTheDocument();

        const imageElement = screen.getByRole('img');
        expect(imageElement).toHaveAttribute('alt', 'Grey beach');
        expect(imageElement).toHaveAttribute('src', mockImage.main_attachment.big);
    });

    test('triggers onLike function and changes icon color when like button is clicked', () => {
        const { rerender } = render(<CardItem image={mockImage} onLike={mockOnLike} />);

        const likeIcon = screen.getAllByTestId('like-icon')[0];

        expect(likeIcon).toHaveAttribute('color', 'text.secondary');

        const likeButton = screen.getByRole('button', { name: /add to favorites/i });
        fireEvent.click(likeButton);

        expect(mockOnLike).toHaveBeenCalledTimes(1);
        expect(mockOnLike).toHaveBeenCalledWith(mockImage.id);

        const updatedImage = { ...mockImage, liked: true };
        rerender(<CardItem image={updatedImage} onLike={mockOnLike} />);

        const updatedLikeIcon = screen.getAllByTestId('like-icon')[0];
        expect(updatedLikeIcon).toHaveAttribute('color', '#068eff');
    });

    test('renders the small image on small screens', () => {
        (useMediaQuery as jest.Mock).mockReturnValue(true);

        render(<CardItem image={mockImage} onLike={jest.fn()} />);

        const imageElement = screen.getByRole('img');
        expect(imageElement).toHaveAttribute('src', mockImage.main_attachment.small);
    });
});
