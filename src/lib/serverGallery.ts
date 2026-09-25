import { GALLERY_PHOTOS, GalleryPhoto } from './galleryData';

/**
 * Returns the art-directed gallery photos list.
 */
export function getServerGalleryPhotos(): GalleryPhoto[] {
  return GALLERY_PHOTOS;
}
