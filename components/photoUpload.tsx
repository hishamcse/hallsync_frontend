import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@mui/material';
import MyCard from './card';

type UploadPhotoProps = {
  onChange: (file: File | null) => void;
};

export function UploadPhoto(props: UploadPhotoProps) {
  const [file, setFile] = useState<File | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      props.onChange(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  }

  return (
    <div className="App" style={{ color: 'white' }}>
      <MyCard title="Upload Photo">
          <form>
            {file && <p>Selected File: {file.name}</p>}
            <Button variant="outlined" component="label">
              Upload Photo
              <input type="file" hidden onChange={handleChange} />
            </Button>
          </form>
      </MyCard>
    </div>
  );
}
