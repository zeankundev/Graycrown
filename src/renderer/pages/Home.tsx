import GCSettingsAPI from "../modules/api/SettingsParsingAPI";

export default function Home() {
  const settingsAPI = new GCSettingsAPI();
  console.log(`${settingsAPI.getUILanguage()}`)
  return (
    <div>
      <h1>Welcome back!</h1>
      <h3>
        language: {settingsAPI.getUILanguage()}
        <br></br>
        homeURL: {settingsAPI.getHomePageRepository()}
        <br></br>
        styleURL: {settingsAPI.getStyleURL()}
      </h3>
    </div>
  );
}

