import React, { useRef } from 'react';
import { useField } from 'formik';
import { FiUpload, FiX } from 'react-icons/fi';

interface FileInputProps {
  name: string;
  lableTxt: string;
  accept?: string;
  error?: string;
  touched?: boolean;
}

export default function FileInput({
  name,
  lableTxt,
  accept = ".pdf",
  error,
  touched
}: FileInputProps) {
  const [field, , helpers] = useField(name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      if (file.type !== 'application/pdf') {
        helpers.setError('მხოლოდ PDF ფორმატი დაშვებულია');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        helpers.setError('ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს');
        return;
      }
      helpers.setValue(file);
      helpers.setTouched(true);
    }
  };

  const handleRemoveFile = () => {
    helpers.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {lableTxt}
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {!field.value ? (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-gray-500/20 transition-all"
        >
          <FiUpload className="mx-auto text-3xl text-gray-300 mb-2" />
          <p className="text-white text-sm">
            დააწკაპუნე ან გადმოაგდე PDF ფაილი
          </p>
          <p className="text-gray-300 text-xs mt-1">
            მაქსიმუმ 5MB
          </p>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-500/20">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              PDF
            </div>
            <div>
              <p className="text-white text-sm font-medium">
                {field.value.name}
              </p>
              <p className="text-gray-300 text-xs">
                {(field.value.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      )}

      {touched && error && (
        <p className="text-red-300 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}