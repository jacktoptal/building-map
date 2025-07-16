import React from 'react';
import DeckGL from '@deck.gl/react';
import Map from 'react-map-gl/mapbox';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import {load} from '@loaders.gl/core';
import {GLBLoader} from '@loaders.gl/gltf';

import MyWebGLLayer from './MyWebGLLayer';

import 'mapbox-gl/dist/mapbox-gl.css';

import {AmbientLight, DirectionalLight, LightingEffect} from '@deck.gl/core';

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

export default function StreetMap() {
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
      layers={[layer1]}
    >
      <Map
        mapStyle="mapbox://styles/belopot/ckbt1oxxw0gjr1jlahbsj7c3s"
        mapboxAccessToken="pk.eyJ1IjoiYmVsb3BvdCIsImEiOiJjazZzMjB4ZjQwYzhwM2xzNTVkcHBudTY4In0.FbuCqIEfhgMN3d02eZQ4hQ"
      />
    </DeckGL>
  );
}
