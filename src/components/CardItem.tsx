import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Image } from './../types/interfaces';
import React from 'react';


interface CardPromps {
    image: Image,
    onLike: (id: number) => void,
}


const CardItem: React.FC<CardPromps> = ({ image, onLike }) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt={image.title}
            loading="lazy"
            image={isSmallScreen ? image.main_attachment.small : image.main_attachment.big}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {image.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                By {image.author}
            </Typography>
            <Typography  variant="body2" sx={{ color: 'text.secondary' }}>
                Price: {image.price}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="add to favorites"
                onClick={() => {
                    onLike(image.id);
                }}>
                <FontAwesomeIcon color={image.liked ? "#068eff" : "text.secondary"} icon={faHeart} data-testid="like-icon"></FontAwesomeIcon>
                <Typography variant="body2" sx={{ marginLeft: 1, color: 'text.secondary' }}>
                    {image.likes_count}
                </Typography>
            </IconButton>

        </CardActions>
    </Card>
};

export default CardItem;