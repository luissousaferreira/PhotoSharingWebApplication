import { Photo } from "./photo";

export interface User {
    _id: string;
    userName: string;
    password: string;
    uploadedPhotos: Photo[];
    likedPhotos: Photo[];
    favoritePhotos: Photo[];
    isPhotographer: boolean;
}
