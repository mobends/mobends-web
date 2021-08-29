import classNames from 'classnames';
import React from 'react';
import { StylableProps } from './commonProps';

/* Styles */
import './InputField.scss';

export interface InputFieldProps extends StylableProps {
    value: string;
    type?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
    placeholder?: string;
}

export function InputField({className, ...props}: InputFieldProps) {
    return (
        <input className={classNames('InputField', className)} {...props} />
    );
}