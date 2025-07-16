import {Layer} from '@deck.gl/core';
import * as THREE from 'three';

export default class ThreeLayer extends Layer {
  constructor(props) {
    super(props);
    console.log('ThreeLayer constructor called');
  }

  initializeState() {
    console.log('initializeState() called');
    const {gl} = this.context;

    if (!gl) {
      console.error('WebGL context is not available');
      return;
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      antialias: true,
    });
    this.renderer.autoClear = false;

    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    console.log('Three.js scene:', this.scene);

    this.camera = new THREE.PerspectiveCamera(
      75,
      gl.canvas.width / gl.canvas.height,
      0.1,
      1000,
    );
    this.camera.position.z = 500;
  }

  draw({uniforms}) {
    console.log('draw() called');

    if (!uniforms || !uniforms.projectionMatrix || !uniforms.viewMatrix) {
      console.warn('Skipping draw: uniforms not available yet');
      this.context.deck.redraw();
      return;
    }

    this.camera.projectionMatrix.fromArray(uniforms.projectionMatrix);
    this.camera.matrixWorldInverse.fromArray(uniforms.viewMatrix);
    this.camera.updateMatrixWorld(true);

    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
  }
}
