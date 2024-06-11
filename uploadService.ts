// app/uploadService.ts
import axios from 'axios';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.location;
};
