import React from 'react';

export const EggCanvas = () => {
  const [canvasEl, setCanvasEl] = React.useState<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    console.log(canvasEl);
    if (!canvasEl) return;
  }, [canvasEl]);
  return <canvas ref={(el) => setCanvasEl(el)} />;
};
