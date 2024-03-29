import React, { useState, useEffect } from 'react';
import GCSettingsAPI from "../modules/api/SettingsParsingAPI";

export default function Home() {
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const settingsAPI = new GCSettingsAPI();
    const homePageRepository = settingsAPI.getHomePageRepository();
    
    fetch(homePageRepository)
      .then(res => res.json())
      .then(data => {
        setMetadata(data.items); // Set metadata to data.items
      })
      .catch(error => {
        console.error('Error fetching metadata:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div>
      <h1>Welcome back!</h1>
      {metadata.map(metadataItem => (
        <div className='gcui-recommend-fragment' style={{backgroundImage: `url(${metadataItem.banner})`}}>
          <img className='gcui-image-generic' src={metadataItem.banner}></img>
          <p className='gcui-fragmented-p'>{metadataItem.name.length > 13 ? `${metadataItem.name.substring(0, 13)}...` : metadataItem.name}</p>
          {/* Render other metadata properties here */}
        </div>
      ))}
    </div>
  );
}
