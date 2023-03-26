import React, { useEffect, useRef } from 'react';
import classes from './Background.module.scss';

function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    import('./backgroundCanvas').then(({ load }) => {
      if (ref.current) {
        load(ref.current);
      }
    });
  }, []);

  return (
    <div className={classes.Background}>
      <canvas ref={ref}></canvas>
    </div>
  );
}

export default Background;
