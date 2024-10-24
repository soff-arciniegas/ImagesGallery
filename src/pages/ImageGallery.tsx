import CardItem from "../components/CardItem";
import Grid from '@mui/material/Grid2';
import useImages from "../hooks/useImages";
import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import NotFound from "./NotFound";



const ImageGallery = () => {
    const { items, handleSearch, likeImage, error, loadMoreImages, isLoading, hasMoreImages } = useImages();
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView && !isLoading) {
            loadMoreImages()
        }
    }, [inView]);

    return (
        <>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }}>
                <SearchBar onSearch={handleSearch} />
            </Box>

            <div className='card-list-container'>
                {error ? <NotFound /> :
                    <Grid container spacing={3} justifyContent="center">
                        {items.map((item) => (
                            <Grid
                                justifyContent="center"
                                size={{ xs: 8, sm: 5, md: 4, lg: 3 }}
                                key={item.id}
                            >
                                <CardItem image={{
                                    "id": item.id,
                                    "title": item.title,
                                    "price": item.price,
                                    "author": item.author,
                                    "main_attachment": item.main_attachment,
                                    "likes_count": item.likes_count,
                                    "liked": item.liked
                                }} onLike={likeImage} />
                            </Grid>
                        ))}
                    </Grid>
                }
            </div>

            {hasMoreImages && <div ref={ref} style={{ height: '20px', backgroundColor: 'transparent' }} />}
            {isLoading && <Typography align="center">Loading...</Typography>}
        </>
    );

}

export default ImageGallery;
