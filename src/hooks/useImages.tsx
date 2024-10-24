import { useState, useEffect } from "react";
import { Image } from '../types/interfaces'
import { searchImages, toggleLikeImage } from "../api/apiServices";

const useImages = () => {
    const [items, setItems] = useState<Image[]>([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreImages, setHasMoreImages] = useState(true);

    const fetchImages = async (page: number, searchTerm = '') => {
        setIsLoading(true);
        const { success, data, message } = await searchImages(searchTerm, page);
        if (success) {
            setItems((prevItems) => [...prevItems, ...data]);
            if (data.length === 0) {
                setError(true)
                setHasMoreImages(false);
            }
        } else {
            console.log('Error useImage', message)
            setError(true)
        }
        setIsLoading(false)

    };

    const loadMoreImages = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setItems([]);
        setPage(1);
        setHasMoreImages(true);
    };


    const likeImage = async (id: number) => {
        const { success, message, status } = await toggleLikeImage(id);
        if (success) {
            if (status == 204) {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, liked: !item.liked, likes_count: item.liked ? item.likes_count - 1 : item.likes_count + 1 } : item
                    )
                );
            }
        } else {
            console.log('Error likeImage', message)
        }
    };

    useEffect(() => {
        if (hasMoreImages) {
            fetchImages(page, searchTerm);
        }
    }, [page, searchTerm]);

    return {
        items,
        loadMoreImages,
        handleSearch,
        likeImage,
        error,
        isLoading,
        hasMoreImages
    };
};

export default useImages;