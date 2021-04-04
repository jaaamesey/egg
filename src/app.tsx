import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { EggCanvas } from './ui/base/egg_canvas';
import { TopMenu } from './ui/top_menu';
import { BottomMenu } from './ui/bottom_menu';

const App = () => {
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
              backgroundImage:
                'url(https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F07%2Fel-yunque-national-rainforest-tropical-puerto-rico-TROPICALPLANTS0617.jpg)',
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
              <EggCanvas />
            </div>
            <div
              className="h-full flex flex-col justify-between"
              style={{ gridRowStart: 1, gridColumnStart: 1 }}
            >
              <TopMenu />
              <BottomMenu />
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
