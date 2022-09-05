import React, { useEffect, useState } from 'react';
import './AppShell.scss';

import { InputWithSelect } from '../components/InputWithSelect';

import { initialState, categorysMap, filters, directions } from './constants';

export const AppShell = () => {
  const [currentArray, setCurrentArray] = useState(filters);

  const [categoryFrom, setCategoryFrom] = useState('БанкиRUB');
  const [fromArray, setFromArray] = useState(initialState);
  const [currentMapFrom, setCurrentMapFrom] = useState(categorysMap);

  const [categoryTo, setCategoryTo] = useState('Все');
  const [toArray, setToArray] = useState(initialState);
  const [filtredToArray, setFiltredToArray] = useState(toArray);
  const [currentMapTo, setCurrentMapTo] = useState(categorysMap);

  useEffect(() => {
    //Получение текущей карты Категорий для формы "Отдаете"
    const mapCopy = Object.assign({}, categorysMap);

    for (let key in mapCopy) {
      const filtredMapItem = mapCopy[key].filter((item) => {
        if (directions.findIndex((dir) => dir.code === item) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      mapCopy[key] = filtredMapItem;
      if (!mapCopy[key].length && key !== 'Все') {
        delete mapCopy[key];
      }
    }
    setCurrentMapFrom(mapCopy);
  }, [categoryFrom]);

  useEffect(() => {
    //Получение текущей карты Категорий для формы "Получаете"
    const mapCopy = Object.assign({}, categorysMap);

    for (let key in mapCopy) {
      const filtredMapItem = mapCopy[key].filter((item) => {
        if (toArray.findIndex((dir) => dir.value === item) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      mapCopy[key] = filtredMapItem;
      if (!mapCopy[key].length && key !== 'Все') {
        delete mapCopy[key];
      }
    }

    setCurrentMapTo(mapCopy);
  }, [toArray]);

  useEffect(() => {
    //Фильтрация основного массива, в зависимости от того, какая категория будет выбрана в "Отдаете"

    if (categoryFrom === 'Все') {
      setCurrentArray(filters);
    } else {
      const array = filters.filter((item) => currentMapFrom[categoryFrom].includes(item.from.code));

      setCurrentArray(array);
      setCategoryTo('Все');
    }
  }, [categoryFrom, currentMapFrom]);

  useEffect(() => {
    //Фильтрация основного массива, в зависимости от того, какая категория будет выбрана в 'Получаете'

    if (categoryTo === 'Все') {
      setFiltredToArray(toArray);
    } else {
      const array = toArray.filter((item) => {
        return currentMapTo[categoryTo].includes(item.value);
      });
      setFiltredToArray(array);
    }
  }, [categoryTo, currentMapTo, toArray, categoryFrom]);

  useEffect(() => {
    //парсинг массивов для селектов
    const newToArray = [];
    const filtredArray = currentArray.map((item) => {
      newToArray.push(item.to);
      return {
        value: item.from.code,
        label: item.from.name,
      };
    });
    const preparedToArray = newToArray.flat(1).map((item) => {
      return {
        value: item.code,
        label: item.name,
      };
    });
    setFromArray(filtredArray);
    setToArray(preparedToArray);
  }, [currentArray]);

  return (
    <div className="appShell">
      <div className="appShell__wrapper">
        <h2 className="appShell__title">Отдаёте</h2>
        <InputWithSelect
          options={fromArray}
          category={categoryFrom}
          setCategory={setCategoryFrom}
          tabs={Object.keys(currentMapFrom)}
        />
      </div>
      <div className="appShell__wrapper">
        <h2 className="appShell__title">Получаете</h2>
        <InputWithSelect
          options={filtredToArray}
          category={categoryTo}
          setCategory={setCategoryTo}
          tabs={Object.keys(currentMapTo)}
        />
      </div>
    </div>
  );
};
