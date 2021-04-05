import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TopMenu } from './ui/top_menu';
import { BottomMenu } from './ui/bottom_menu';

const EggCanvas = React.lazy(() => import('./ui/base/egg_canvas'));

const App = () => {
  const [ar, setAr] = React.useState(false);
  const toggleAr = () => setAr((ar) => !ar);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div
            className="h-full"
            style={{
              display: 'grid',
              maxWidth: '100%',
              gridTemplateColumns: '1fr',
              gridTemplateRows: '1fr',
              background: 'linear-gradient(to bottom, #ffefba, #ffffff)',
            }}
          >
            <div
              style={{
                height: '100%',
                maxWidth: '100%',
                gridRowStart: 1,
                gridColumnStart: 1,
                overflow: 'hidden',
              }}
            >
              <React.Suspense fallback={<div />}>
                <EggCanvas ar={ar} />
              </React.Suspense>
            </div>
            <div
              className="h-full flex flex-col justify-between"
              style={{ gridRowStart: 1, gridColumnStart: 1 }}
            >
              <TopMenu ar={ar} onARClicked={toggleAr} />
              <BottomMenu />
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
