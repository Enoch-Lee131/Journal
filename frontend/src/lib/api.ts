export const getApiUrl = () => {
    // @ts-ignore - Ignore the TypeScript error
    return import.meta.env?.VITE_API_URL || 'https://journal-kqvg.onrender.com';
  };
  
  