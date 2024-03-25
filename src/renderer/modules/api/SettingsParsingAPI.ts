import * as fs from 'fs';
import * as remote from '@electron/remote';
import * as path from 'path';

const app = remote.app;

interface Config {
    language: string;
    custom: string;
    styleURL: string;
    startup?: string;
}

export default class GCSettingsAPI {
    private language: string = '';
    private homePageRepository: string = '';
    private styleURL: string = '';
    private cachedSettingsBuffer: Config = { language: '', custom: '', styleURL: '' };

    constructor() {
        this.loadSettings().then(() => {
            console.log('Settings loaded!');
        });
    }

    private async loadSettings() {
      console.log('Settings initialized!');
      const configPath = path.join(app.getPath('userData'), '/config.json');
      try {
          const data = fs.readFileSync(configPath, 'utf8');
          const parsedData = JSON.parse(data);
          if (parsedData && parsedData.config) {
              const config: Config = parsedData.config;
              console.log(config);
              this.language = config.language;
              this.homePageRepository = config.custom;
              this.styleURL = config.styleURL;
              console.log(`language: ${this.language}\nhomePageRepo: ${this.homePageRepository}\nstyleURL:${this.styleURL}`);
          } else {
              console.error('Error: Invalid config data format.');
          }
      } catch (error) {
          console.error('Error reading config file:', error);
      }
  }
  
  

    private saveSettings() {
        const configPath = path.join(app.getPath('userData'), '/config.json');
        try {
            fs.writeFileSync(configPath, JSON.stringify(this.cachedSettingsBuffer, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing config file:', error);
        }
    }

    public getUILanguage(): String {
        return this.language;
    }

    public getHomePageRepository(): String {
        return this.homePageRepository;
    }

    public getStyleURL(): String {
        return this.styleURL;
    }

    public setUILanguage(language: string) {
        this.cachedSettingsBuffer.language = language;
        this.saveSettings();
    }

    public setHomeRepoURL(url: string) {
        this.cachedSettingsBuffer.custom = url;
        this.saveSettings();
    }

    public setStyleURL(url: string) {
        this.cachedSettingsBuffer.styleURL = url;
        this.saveSettings();
    }
}
