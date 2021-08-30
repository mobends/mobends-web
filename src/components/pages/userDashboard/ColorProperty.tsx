import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

/* Styles */
import './ColorProperty.scss';
import { StylableProps } from '../../shared/commonProps';
import classNames from 'classnames';
import { ColorSwatch } from '../../shared/ColorSwatch';

export interface ColorPropertyProps extends StylableProps {
    color: number;
    onChange(color: number): void;
}

export function ColorProperty({color, ...props}: ColorPropertyProps) {
    const [innerColor, setInnerColor] = useState(`#${color.toString(16)}`);
    const [colorPickerShown, setColorPickerShown] = useState(false);

    const handleChange = (color: ColorResult) => {
        setInnerColor(color.hex);
    };

    const handleChangeComplete = (color: ColorResult) => {
        setInnerColor(color.hex);
        props.onChange(Number.parseInt(color.hex.substring(1), 16));
    };

    const handleClick = () => {
        setColorPickerShown(v => !v);
    };

    const handleClose = () => {
        setColorPickerShown(false);
    };

    return (
        <div className={classNames('ColorProperty', props.className)} style={props.style}>
            <ColorSwatch color={innerColor} onClick={handleClick} />
            {colorPickerShown && <div className="ColorProperty__colorPicker">
                <div className="ColorProperty__colorPicker__cover" onClick={handleClose}/>
                <SketchPicker color={innerColor} onChange={handleChange} onChangeComplete={handleChangeComplete} />
            </div>}
        </div>
    );
}