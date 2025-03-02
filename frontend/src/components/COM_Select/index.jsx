import React from 'react';
import Select from 'react-select';

import classNames from 'classnames/bind';
import style from './COM_Select.module.css';

function COM_Select({
    options,
    onChange,
    placeholder = 'Select an option',
    isMulti = false,
    isDisabled = false,
    props = {},
    keyLabel,
    keyValue,
    defaultValue,
}) {
    const cx = classNames.bind(style);
    const valueDefault = options.find((option) => option['slug'] === defaultValue);
    return (
        <Select
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            isMulti={isMulti}
            isDisabled={isDisabled}
            value={valueDefault}
            {...props}
            getOptionLabel={(option) => option[keyLabel]}
            getOptionValue={(option) => option[keyValue]}
            className={cx('wrapper-select')}
            classNamePrefix={cx('wrapper-select')}
        />
    );
}

export default COM_Select;
