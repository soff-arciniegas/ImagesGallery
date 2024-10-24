import { Box } from "@mui/material";



const NotFound = () => {
    return (
        <Box  margin="20px" justifyContent="center">
            <img
            className="not-found-image"
                src='/assets/page_not_found.svg'
                alt="No results found"
                style={{marginBottom: '20px' }}
            />
        </Box>
    );

}

export default NotFound