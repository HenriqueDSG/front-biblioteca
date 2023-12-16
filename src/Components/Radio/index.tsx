import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props {
    options: any[];
    label: string;
    onChange: Function;
}

const RowRadioButtonsGroup: React.FC<Props> = (props) => {
    const [selectedValue, setSelectedValue] = useState<number | undefined>(undefined);

    useEffect(() => {
        const defaultValue = props.options.find((option) => option.selected)?.value;
        setSelectedValue(defaultValue);
    }, [props.options]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedValue(value);

        const updatedOptions = props.options.map((option) => ({
            ...option,
            selected: option.value === value,
        }));

        props.onChange(updatedOptions);
    };

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{props.label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
            >
                {
                    props.options.map((item) => (
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                            checked={item.value === selectedValue}
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
};

export default RowRadioButtonsGroup;
