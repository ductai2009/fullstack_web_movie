import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import classNames from 'classnames/bind';
import style from './COM_MultipleSelect.module.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedValues, theme) {
    return {
        fontWeight: selectedValues.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

function COM_MultipleSelect({ label, options, selectedValues = [], onChange, props = {} }) {
    const cx = classNames.bind(style);
    const theme = useTheme();
    const [selected, setSelected] = React.useState(selectedValues);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const newSelection = typeof value === 'string' ? value.split(',') : value;
        setSelected(newSelection);
        if (onChange) {
            onChange(newSelection);
        }
    };

    return (
        <FormControl sx={{ m: 1 }} {...props} className={cx('wrapper')}>
            <InputLabel className={cx('label')}>{label}</InputLabel>
            <Select
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
                variant="standard"
                className={cx('Select')}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option['slug']}
                        className={cx('MenuItem')}
                        value={option['slug']}
                        style={getStyles(option['slug'], selected, theme)}
                    >
                        {option['name']}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default COM_MultipleSelect;
