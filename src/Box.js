import React from 'react';
import { ReactComponent as DragHandle } from './assets/drag-handle.svg';

import './Box.scss';

function Box() {
  return (
    <div className="box">
      <DragHandle className="box__handle" data-position="left" />
      <DragHandle className="box__handle" data-position="right" />
    </div>
  )
}

export default Box;
