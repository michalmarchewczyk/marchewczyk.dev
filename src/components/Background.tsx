import React, { useEffect, useRef } from 'react';
import classes from './Background.module.scss';
import { load } from './backgroundCanvas';

function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      load(ref.current);
    }
  }, []);

  return (
    <div className={classes.Background}>
      <canvas ref={ref}></canvas>
    </div>
  );
}

export default Background;
