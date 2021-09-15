import React from 'react';
import { orderBy } from 'lodash-es';
import { Input, Empty } from 'antd';

import { DialogItem } from '../index';

import './Dialogs.scss';

const Dialogs = ({ items, userId, onSearch, inputValue, currentDialogId }) => (
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
          key={item._id}
          isMe={item.author._id === userId}
          userId={userId}
          currentDialogId={currentDialogId}
          {...item}
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
