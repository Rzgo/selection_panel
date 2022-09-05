import React, { useState } from 'react';
import './Select.scss';

import classNames from 'classnames';

import { ArrowSvg } from './ArrowSvg';

export const Select = ({ options, placeholder, className, value, onChange }) => {
  const [selectIsClosed, setSelectIsClosed] = useState(true);

  const handleClick = () => {
    const status = selectIsClosed ? false : true;
    setSelectIsClosed(status);
  };
  const changeValue = (v) => {
    onChange(v);
    setSelectIsClosed(true);
  };

  const uniqueOptions = options.reduce((acc, i) => {
    if (!acc.find((v) => v.value === i.value)) {
      acc.push(i);
    }
    return acc;
  }, []);

  return (
    <div className="selectContainer">
      <div
        className={classNames('selectContainer__header', className, {
          selectContainer__header_opened: !selectIsClosed,
          selectContainer__header_empty: !value,
          selectContainer__header_selected: value,
        })}
        onClick={handleClick}
      >
        {value.label ? value.label : placeholder}
        <ArrowSvg
          className={classNames('selectContainer__arrow', {
            selectContainer__arrow_rotate: !selectIsClosed,
          })}
        />
      </div>
      <ul
        className={classNames('selectContainer__body', {
          selectContainer__body_closed: selectIsClosed,
        })}
      >
        {uniqueOptions.map(
          (item) =>
            value.label !== item.label && (
              <li
                key={item.value}
                className={classNames('selectContainer__item', className, {
                  selectContainer__item_closed: selectIsClosed,
                })}
                onClick={() => changeValue(item)}
              >
                {item.label}
              </li>
            )
        )}
      </ul>
    </div>
  );
};
