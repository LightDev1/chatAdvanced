import React from 'react';
import { orderBy } from 'lodash-es';
import { Input, Empty } from 'antd';

import { DialogItem } from '../index';

import './Dialogs.scss';

const Dialogs = ({ items, userId, onSearch, inputValue }) => (
  <div className="dialogs">
    <div className="dialogs__search">
      <Input.Search
        placeholder="Поиск среди контактов"
        onChange={onSearch}
        value={inputValue}
      />
    </div>
    {items.length ? (
      orderBy(items, ['createdAt'], ['desc']).map((item) => (
        <DialogItem
          // key={item._id}
          key={Math.random()}
          {...item}
          isMe={item.user._id === userId}
        />
      ))
    ) : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Ничего не найдено"
      />
    )
    }
  </div>
);

export default Dialogs;
