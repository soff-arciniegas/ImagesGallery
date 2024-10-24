import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/search.css';
import { Box, AppBar, Toolbar } from "@mui/material";


interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    }

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Buscar..."
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};



export default SearchBar;