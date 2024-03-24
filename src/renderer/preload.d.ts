import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler,
    ipcRenderer: {
      on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void;
    };
  }
}

export {};
