import React from 'react';
import { AR, Permissions } from 'expo';
import * as ExpoTHREE from 'expo-three';
import * as THREE from 'three';

import { PermissionsRequester } from './components';

ExpoTHREE.suppressExpoWarnings();

export default class ARPointsScreen extends React.Component {
  static title = 'AR Points';

  render() {
    return (
      <PermissionsRequester permissionsTypes={[Permissions.CAMERA]}>
        <AR.ARView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
        />
      </PermissionsRequester>
    );
  }

  onContextCreate = async (gl, { width, height }) => {
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      width,
      height,
      clearColor: 0xffffff,
    });
    this.scene = new THREE.Scene();
    this.scene.background = new ExpoTHREE.AR.BackgroundTexture(this.renderer);
    this.camera = new ExpoTHREE.AR.Camera(75, width / height, 0.01, 1000);
    this.points = new ExpoTHREE.AR.Points();
    this.scene.add(this.points);
  };

  onResize = ({ pixelRatio, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    this.points.update();
    this.renderer.render(this.scene, this.camera);
  };
}
