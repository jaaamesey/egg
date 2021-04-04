import React from 'react';
import Filament from 'filament';

export const FilamentCanvas = () => {
  const [canvasEl, setCanvasEl] = React.useState<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    console.log(canvasEl);
    if (!canvasEl) return;
    Filament.init([], () => {
      console.log('INIT!');
    });
  }, [canvasEl]);
  return <canvas ref={(el) => setCanvasEl(el)} />;
};
