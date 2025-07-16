import {Layer} from '@deck.gl/core';

class MyWebGLLayer extends Layer {
  initializeState() {
    const {gl} = this.context;

    // Initialize WebGL resources: buffer, shaders, program
    const buffer = gl.createBuffer();
    const vertexShaderSource = `
        attribute vec3 position;
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;
    const fragmentShaderSource = `
        void main() {
          gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
        }
      `;
    const vertexShader = this.createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource,
    );
    const fragmentShader = this.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    const program = this.createProgram(gl, vertexShader, fragmentShader);

    this.state = {
      gl,
      buffer,
      program,
    };

    // Define triangle vertices
    const vertices = new Float32Array([
      0.0,
      0.5,
      0.0, // Top
      -0.5,
      -0.5,
      0.0, // Bottom left
      0.5,
      -0.5,
      0.0, // Bottom right
    ]);

    // Bind buffer and upload vertices to WebGL
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  }

  updateState({changeFlags}) {
    const {gl} = this.context;

    if (changeFlags.propsChanged) {
      // Handle any changes to the props here if needed
    }
  }

  draw() {
    const {gl, buffer, program} = this.state;

    // Use the program
    gl.useProgram(program);

    // Bind the buffer and set up the attribute pointer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  finalizeState() {
    const {gl, buffer} = this.state;

    // Delete WebGL resources
    gl.deleteBuffer(buffer);
  }

  // Utility function to create a shader
  createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('ERROR compiling shader!', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // Utility function to create a program
  createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('ERROR linking program!', gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }
}

export default MyWebGLLayer;
