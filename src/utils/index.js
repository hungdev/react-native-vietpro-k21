import baseUrl from '../services/config';

export function getImageUrl(image) {
  const imageName = image && image.replace('uploads/', '')
  return `${baseUrl.devUrl}/${imageName}`
}
