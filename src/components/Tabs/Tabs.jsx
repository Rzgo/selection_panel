import React from 'react';
import './Tabs.scss';

import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export const Tabs = ({ category, setCategory, tabs }) => {
  const getCurrentCategory = (value) => {
    switch (value) {
      case 'БанкиRUB':
        return 'Банки RUB';

      case 'БанкиUAH':
        return 'Банки UAH';

      default:
        return value;
    }
  };

  const handleClick = (value) => {
    if (value === 'Банки RUB') {
      setCategory('БанкиRUB');
    } else if (value === 'Банки UAH') {
      setCategory('БанкиUAH');
    } else {
      setCategory(value);
    }
  };

  return (
    <ul className="tabs-container">
      {tabs.map((item) => (
        <li
          className={classNames('tabs-container__item', {
            'tabs-container__item_active': item === category,
          })}
          onClick={() => handleClick(item)}
          key={uuidv4()}
        >
          {getCurrentCategory(item)}
        </li>
      ))}
    </ul>
  );
};
