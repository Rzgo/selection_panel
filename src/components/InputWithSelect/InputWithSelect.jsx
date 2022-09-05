import React, { useState } from 'react';
import './InputWithSelect.scss';

import { Tabs } from '../Tabs';
import { Select } from '../Select';

export const InputWithSelect = ({ options, category, setCategory, tabs }) => {
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState(options[0]);

  const handleChange = (e) => {
    const currentValue = e.target.value;

    setValue(currentValue);
  };

  return (
    <div className="inputWithSelect">
      <Tabs category={category} setCategory={setCategory} tabs={tabs} />
      <div className="inputWithSelect__wrapper">
        <input className="inputWithSelect__input" value={value} onChange={handleChange} />
        <Select
          options={options}
          placeholder="Валюта"
          value={selectValue}
          onChange={setSelectValue}
        />
      </div>
    </div>
  );
};
