import React from 'react';
import { StylableProps } from './commonProps';

export interface InputFieldProps extends StylableProps {
    value: string;
    type?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

export function InputField(props: InputFieldProps) {
    return (
        <input {...props} />
    );
}