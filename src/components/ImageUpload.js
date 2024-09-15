import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [format, setFormat] = useState('jpeg');
  const [operation, setOperation] = useState('rotate');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleProcessImage = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('operation', operation);
    formData.append('format', format);
    formData.append('brightness', brightness);
    formData.append('contrast', contrast);
    formData.append('saturation', saturation);
    formData.append('rotation', rotation);

    try {
      const response = await axios.post(
        'https://image-processing-af87.onrender.com/api/process-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setProcessedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `processed-image.${format}`;
    link.click();
  };

  return (
    <div className='bg-white p-8 rounded shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Upload and Process Image</h2>
      <input type='file' accept='image/*' onChange={handleImageUpload} />

      <div className='mt-4'>
        <label className='block mb-2'>Choose Format:</label>
        <select
          onChange={(e) => setFormat(e.target.value)}
          value={format}
          className='p-2 border'
        >
          <option value='jpeg'>JPEG</option>
          <option value='png'>PNG</option>
        </select>
      </div>

      <div className='mt-4'>
        <label className='block mb-2'>Rotation:</label>
        <input
          type='range'
          min='0'
          max='360'
          value={rotation}
          onChange={(e) => setRotation(e.target.value)}
          className='w-full'
        />
      </div>

      <div className='mt-4'>
        <label className='block mb-2'>Brightness:</label>
        <input
          type='range'
          min='0.1'
          max='2'
          step='0.1'
          value={brightness}
          onChange={(e) => setBrightness(e.target.value)}
          className='w-full'
        />
      </div>

      <div className='mt-4'>
        <label className='block mb-2'>Contrast:</label>
        <input
          type='range'
          min='0.1'
          max='2'
          step='0.1'
          value={contrast}
          onChange={(e) => setContrast(e.target.value)}
          className='w-full'
        />
      </div>

      <div className='mt-4'>
        <label className='block mb-2'>Saturation:</label>
        <input
          type='range'
          min='0.1'
          max='2'
          step='0.1'
          value={saturation}
          onChange={(e) => setSaturation(e.target.value)}
          className='w-full'
        />
      </div>

      <button
        onClick={handleProcessImage}
        className='mt-4 p-2 bg-blue-500 text-white rounded'
      >
        Process Image
      </button>

      {processedImageUrl && (
        <div className='mt-6 max-w-sm mx-auto bg-gray-100 p-4 rounded shadow-md text-center'>
          <h3 className='text-lg font-semibold'>Processed Image:</h3>
          <img
            src={processedImageUrl}
            alt='Processed'
            className='mt-4 max-w-full rounded-lg'
          />
          <button
            onClick={handleDownload}
            className='mt-4 p-2 bg-green-500 text-white rounded'
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
