'use client';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryUploadResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string>('');

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={250}
          height={170}
          alt="Uploaded Image"
        />
      )}

      <CldUploadWidget
        uploadPreset="next-app"
        onSuccess={(result) => {
          console.log('Upload successful:', result);
          const info = result.info as CloudinaryUploadResult;
          if (info.public_id) setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => open()}
          >
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
