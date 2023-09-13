import React, {ChangeEvent} from 'react';
import {MyButton} from './button';

type UploadPhotoProps = {
    onChange: (file: File | null) => void;
};

export function UploadPhoto(props: UploadPhotoProps) {

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            props.onChange(event.target.files[0]);
        }
    }

    return (
        <form>
            <MyButton isLabel={true} text='Upload Photo' type='intermediate'>
                <input accept='.png,.jpg,.jpeg,.svg' type="file" hidden onChange={handleChange}/>
            </MyButton>
        </form>
    );
}
