import React from 'react';
import Draggable from './Draggable';
import TimelineItem from './TimelineItem';

import './Timeline.scss';

function Timeline() {
  return (
    <div className="timeline">
      <Draggable>
        <TimelineItem />
      </Draggable>
    </div>
  );
}

export default Timeline;
