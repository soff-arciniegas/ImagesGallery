export interface Image {
    id: number;
    main_attachment: Resource;
    title: string;
    author: string;
    likes_count: number;
    liked: boolean;
    price: number
}

export interface Resource {
    small: string;
    big: string;
}

