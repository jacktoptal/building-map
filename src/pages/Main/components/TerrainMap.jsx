import React from 'react';
import DeckGL from '@deck.gl/react';
import Map, {Source, Layer} from 'react-map-gl/mapbox';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import {AmbientLight, DirectionalLight, LightingEffect} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';
import {load} from '@loaders.gl/core';
import {GLBLoader} from '@loaders.gl/gltf';
import 'mapbox-gl/dist/mapbox-gl.css';

import MyWebGLLayer from './MyWebGLLayer';
import {useStore} from 'state/store';
import ThreeLayer from './ThreeLayer';

// create an ambient light
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 3.0,
});
// create directional light from the sun
const directionalLight = new DirectionalLight({
  color: [255, 255, 255],
  direction: [1, 0, -1],
  intensity: 1,
});
// create lighting effect with light sources
const lightingEffect = new LightingEffect({ambientLight});

//https://raw.githubusercontent.com/belopot/public-assets/master/glb/house.glb
//https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb

const gltf = await load(
  'https://raw.githubusercontent.com/belopot/public-assets/master/glb/house.glb',
  GLBLoader,
);

export default function TerrainMap() {
  const imageVisible = useStore(state => state.imageVisible);
  const setImageVisible = useStore(state => state.setImageVisible);
  const videoVisible = useStore(state => state.videoVisible);
  const setVideoVisible = useStore(state => state.setVideoVisible);

  const layer1 = new ScenegraphLayer({
    id: 'ScenegraphLayer',
    data: [
      {
        name: `Enclave at Kelsey Creek`,
        coordinates: [-122.142386, 47.61232],
      },
    ],
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 0, 90],
    getScene: scenegraph => {
      return scenegraph && scenegraph.scenes
        ? scenegraph.scenes[0]
        : scenegraph;
    },
    scenegraph:
      'https://raw.githubusercontent.com/belopot/public-assets/master/glb/house.glb',
    sizeScale: 1,
    // _animations: {
    //   '*': {speed: 5},
    // },
    _lighting: 'pbr', // 'pbr' or 'flat'
    _imageBasedLightingEnvironment: gltfEnv => {
      console.log('gltfEnv');
      console.log(gltfEnv);
    },
    pickable: true,
  });

  // Create the custom Three.js layer instance
  const layer2 = new MyWebGLLayer({
    id: 'MyWebGLLayer',
  });

  const layer3 = new IconLayer({
    id: 'icon',
    data: [
      {coordinates: [-122.1425, 47.6123], icon: 'image_marker'},
      {coordinates: [-122.1419, 47.6123], icon: 'video_marker'},
    ],
    iconAtlas: 'data/location-icon-atlas.png',
    iconMapping: 'data/location-icon-mapping.json',
    getIcon: d => d.icon,
    getPosition: d => d.coordinates,
    sizeUnits: 'meters',
    sizeScale: 10,
    sizeMinPixels: 6,
    pickable: true,
    onClick: e => {
      if (e.object?.icon == 'image_marker') {
        setImageVisible(true);
      } else {
        setVideoVisible(true);
      }
    },
  });

  const layer4 = new ThreeLayer({
    id: 'threejs-layer',
    data: [
      {
        name: `Enclave at Kelsey Creek`,
        coordinates: [-122.142386, 47.61232],
      },
    ],
    getPosition: d => d.coordinates,
  });

  const skyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15,
    },
  };

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.1425,
        latitude: 47.61235,
        minZoom: 15,
        zoom: 18,
        maxZoom: 21,
        minPitch: 10,
        pitch: 75,
        maxPitch: 80,
        bearing: -90,
      }}
      controller
      effects={[lightingEffect]}
      getTooltip={({object}) => object && object.name}
      layers={[layer1, layer3]}
    >
      <Map
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken="pk.eyJ1IjoiYmVsb3BvdCIsImEiOiJjazZzMjB4ZjQwYzhwM2xzNTVkcHBudTY4In0.FbuCqIEfhgMN3d02eZQ4hQ"
        terrain={{source: 'mapbox-dem', exaggeration: 1.5}}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />
      </Map>
    </DeckGL>
  );
}
