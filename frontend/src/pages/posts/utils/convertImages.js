const BASE_URL = import.meta.env.VITE_SERVER_URL;

const convertImages = async (imageNames) => {
    const convertedImages = await Promise.all(
      imageNames.map(async (imageName) => {
        try {
          const imageUrl = new URL(imageName, BASE_URL);
          const response = await fetch(imageUrl);

          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${imageName}`);
          }

          const blob = await response.blob();
          const file = new File([blob], imageName, { type: blob.type });

          return {
            file,
            preview: URL.createObjectURL(file), 
          };
        } catch (error) {
          console.error(error);
          return null; 
        }
      })
    );

    return convertedImages.filter(Boolean); 
  };

export default convertImages;
