import React, { useState } from 'react';
import produce from 'immer';
import uuidv4 from 'uuid/v4';
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

function doOverlap(a, b) {
  if (a.left >= b.right || b.left >= a.right) {
    return false;
  }
  return true;
}

const initialItems = [
  { id: uuidv4(), left: 50, right: 250 },
  { id: uuidv4(), left: 300, right: 500 },
];

function Timeline() {
  const [savedPosition, setSavedPosition] = useState({});
  const [items, setItems] = useState(initialItems);

  const handleStart = (left, right) => {
    setSavedPosition(produce(savedPosition, draft => {
      draft.left = left;
      draft.right = right;
    }));
  }

  const handleDrag = (index, left, right) => {
    setItems(produce(items, draft => {
      draft[index].left = left;
      draft[index].right = right;
    }));
  }

  const handleStop = (index) => {
    if (doOverlap(items[0], items[1])) {
      setItems(produce(items, draft => {
        draft[index].left = savedPosition.left;
        draft[index].right = savedPosition.right;
        draft.sort((a, b) => (a.left > b.left) ? 1 : -1);
      }));
    } else {
      setItems(produce(items, draft => {
        draft.sort((a, b) => (a.left > b.left) ? 1 : -1);
      }));
    }
    setSavedPosition({});
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
            totalMax={TIMELINE_WIDTH}
            onStart={handleStart}
            onDrag={(left, right) => handleDrag(index, left, right)}
            onStop={() => handleStop(index)}
            key={item.id}
          >
            <TimelineItem />
          </Draggable>
        )
      })}
    </div>
  );
}

export default Timeline;
