import React, {useState} from 'react';
import styled from 'styled-components';
import {Dropdown} from 'primereact/dropdown';

import StreetMap from './components/StreetMap';
import TerrainMap from './components/TerrainMap';
import ImageDialog from './components/ImageDialog';
import VideoDialog from './components/VideoDialog';

export default function Main() {
  const mapStyles = [
    {name: 'Terrain Map', code: 'terrain_map'},
    {name: 'Street Map', code: 'street_map'},
  ];

  const [mapStyle, setMapStyle] = useState(mapStyles[0]);

  return (
    <Holder>
      <MapHolder>
        {mapStyle.code === 'terrain_map' ? <TerrainMap /> : <StreetMap />}
      </MapHolder>
      <ControlsHolder>
        <Dropdown
          value={mapStyle}
          onChange={e => setMapStyle(e.value)}
          options={mapStyles}
          optionLabel="name"
          placeholder="Select a map style"
        />
      </ControlsHolder>
      <ImageDialog />
      <VideoDialog />
    </Holder>
  );
}

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapHolder = styled.div`
  width: 100%;
  height: 100%;
`;

const ControlsHolder = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;
