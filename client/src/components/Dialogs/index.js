import React from 'react';
import { orderBy } from 'lodash-es';

import { DialogItem } from '../index';

import './Dialogs.scss';

const Dialogs = ({ items, userId }) => (
  <div className="dialogs">
    {orderBy(items, ['createdAt'], ['desc']).map((item) => (
      <DialogItem
        key={item._id}
        {...item}
        isMe={item.user._id === userId}
      />
    ))
    }
  </div>
);

export default Dialogs;
