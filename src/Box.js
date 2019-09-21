import React, { useState } from 'react';
import { DraggableCore } from 'react-draggable';
import clamp from 'lodash/clamp';
import { ReactComponent as DragHandle } from './assets/drag-handle.svg';

import './Box.scss';

function Box() {
  const [position, setPosition] = useState('');
  const [left, setLeft] = useState(50);
  const [width, setWidth] = useState(200);

  const onDragStart = (event) => {
    setPosition(event.target.dataset.position);
  };

  const onDrag = (event, data) => {
    const { deltaX } = data;

    if (position === 'left') {
      if (width - deltaX > 60 && left + deltaX > 0) {
        setLeft(left + deltaX);
        setWidth(width - deltaX);
      }
    } else if (position === 'right') {
      setWidth(clamp(width + deltaX, 60, 900 - left));
    } else {
      setLeft(clamp(left + deltaX, 0, 900 - width));
    }
  };

  const onDragStop = () => {
    setPosition('');
  };

  const style = { left, width };

  return (

    <DraggableCore
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragStop}
      handle=".box__handle"
    >
      <div className="box" style={style}>
        <div className="box__handle" data-position="left">
          <DragHandle />
        </div>
        <div className="box__handle" data-position="center" />
        <div className="box__handle" data-position="right">
          <DragHandle />
        </div>
      </div>
    </DraggableCore>

  )
}

export default Box;
