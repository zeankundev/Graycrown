import icon from '../../assets/icon.svg';
import * as remote from '@electron/remote'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import './DefaultTheme.css'
import {
  Home20Filled,
  Home20Regular,
  Dismiss24Regular,
  Square24Regular,
  Subtract24Regular
} from '@fluentui/react-icons'
import TabButton from './modules/TabButton';
import Home from './pages/Home';
import WindowToolsButton from './modules/WIndowToolsButton';
const app = remote.app

export default function App() {
  const focusedWindow = remote?.BrowserWindow.getFocusedWindow();
  return (
    <div className='gcui-container'>
      <BrowserRouter>
        <div className='gcui-topbar'>
          <div className='gcui-tab-collection'>
            <TabButton path='/' reg={Home20Regular} filled={Home20Filled} name='Home'/>
          </div>
          <div className='gcui-draggable'></div>
          <div className='gcui-window-tools'>
            <WindowToolsButton icon={Subtract24Regular} title='Minimize Graycrown' onClick={() => {focusedWindow?.minimize()}} />
            <WindowToolsButton icon={Square24Regular} title='Maximize/Restore Graycrown' onClick={() => {focusedWindow?.isMaximized() ? focusedWindow?.unmaximize() : focusedWindow?.maximize()}} />
            <WindowToolsButton icon={Dismiss24Regular} title='Close Graycrown (alt+f4)' onClick={() => {focusedWindow?.close()}} />
          </div>
        </div>
        <div className='gcui-main'>
          <Switch>
            <Route component={Home} path='/' exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
