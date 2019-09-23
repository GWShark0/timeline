import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './TimelineItem.scss';

function TimelineItem(props) {
  const { style } = props;
  const node = useRef();
  const [active, setActive] = useState(false);

  const handleMouseDown = (event) => {
    setActive(true);
  };

  const handleClickOutside = (event) => {
    if (!node.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active]);

  const classes = classNames(
    'timeline-item',
    active && 'timeline-item--active'
  );

  return (
    <div
      className={classes}
      style={style}
      onMouseDown={handleMouseDown}
      ref={node}
    >
      <div className="handle" data-position="left" />
      <div className="handle" data-position="center" />
      <div className="handle" data-position="right" />
    </div>
  );
}

export default TimelineItem;
