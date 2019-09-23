import React, { useState } from 'react';
import produce from 'immer';
import Draggable from './Draggable';
import TimelineItem from './TimelineItem';

import './Timeline.scss';



function Timeline() {

  const [items, setItems] = useState([
    { left: 50, right: 250 },
    { left: 300, right: 500 },
  ]);

  const handleDrag = (index, left, right) => {
    setItems(produce(items, draft => {
      draft[index].left = left;
      draft[index].right = right;
    }));
  }

  return (
    <div className="timeline">
      {items.map((item, index) => {
        return (
          <Draggable
            left={item.left}
            right={item.right}
            onDrag={(left, right) => handleDrag(index, left, right)}
            key={index}
          >
            <TimelineItem />
          </Draggable>
        )
      })}
    </div>
  );
}

export default Timeline;
