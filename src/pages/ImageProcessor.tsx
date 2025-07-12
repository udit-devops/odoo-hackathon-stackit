import React, { useState, useRef } from 'react';
import { ImageService } from '../services/ImageService';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageService = new ImageService();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEnhanceBackground = async () => {
    if (!originalImage || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const file = await fetch(originalImage).then(r => r.blob()).then(blob => new File([blob], "image.jpg"));
      const enhancedImageUrl = await imageService.enhanceBackground(file);
      setProcessedImage(enhancedImageUrl);
    } catch (error) {
      console.error('Error enhancing background:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateAvatar = async () => {
    if (!originalImage || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const file = await fetch(originalImage).then(r => r.blob()).then(blob => new File([blob], "image.jpg"));
      const avatarImageUrl = await imageService.generateAvatar(file);
      setProcessedImage(avatarImageUrl);
    } catch (error) {
      console.error('Error generating avatar:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">AI Image Processor</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {originalImage && (
                  <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-center mt-2 text-gray-600">Original</p>
            </div>
            <div>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {processedImage && (
                  <img src={processedImage} alt="Processed" className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-center mt-2 text-gray-600">Processed</p>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleTakePhoto}
                className="bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600 transition-colors"
              >
                Select Image
              </button>
            </div>

            <button
              onClick={handleEnhanceBackground}
              disabled={!originalImage || isProcessing}
              className="w-full bg-purple-500 text-white rounded-lg p-4 hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enhance Background
            </button>

            <button
              onClick={handleGenerateAvatar}
              disabled={!originalImage || isProcessing}
              className="w-full bg-indigo-500 text-white rounded-lg p-4 hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Avatar
            </button>
          </div>

          {isProcessing && (
            <div className="text-center mt-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-600 mt-2">Processing image...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageProcessor;