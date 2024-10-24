import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  test('renders SearchBar and handles input correctly', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(inputElement, { target: { value: 'cat' } });

    expect(mockOnSearch).toHaveBeenCalledWith('cat');
  });


  test('calls handleSearch when search button is clicked', () => {
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(inputElement, { target: { value: 'mountain' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(2);
    expect(mockOnSearch).toHaveBeenCalledWith('mountain');
  });
})
