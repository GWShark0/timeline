import React, { useState } from 'react';
import produce from 'immer';
import Draggable from './Draggable';
import TimelineItem from './TimelineItem';

import './Timeline.scss';

const TIMELINE_WIDTH = 900;

const nextItem = (items = [], index) => {
  return items[index + 1];
}

const previousItem = (items = [], index) => {
  return items[index - 1];
}

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
        const next = nextItem(items, index);
        const previous = previousItem(items, index);
        const min = previous ? previous.right : 0;
        const max = next ? next.left : TIMELINE_WIDTH;
        return (
          <Draggable
            left={item.left}
            right={item.right}
            min={min}
            max={max}
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
