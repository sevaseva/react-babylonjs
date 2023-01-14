import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import React, { useEffect, useState } from 'react'
import { Engine, Scene } from 'react-babylonjs'

// const Inspector = () => {
//   const scene = useScene();
//   scene.debugLayer.show();
//   return null;
// };

const GizmoManager = () => {
  const [lightRef, setLightRef] = useState<DirectionalLight | null>(null)

  useEffect(() => {
    console.log('light has been set', lightRef)
  }, [lightRef])
  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-js">
        <Scene>
          <arcRotateCamera
            name="arc"
            target={new Vector3(0, 1, 0)}
            alpha={0.5 + -Math.PI / 2}
            beta={0.5 + Math.PI / 4}
            radius={15}
            minZ={0.001}
            wheelPrecision={50}
          />
          <hemisphericLight name="hemi" direction={new Vector3(0, -1, 0)} intensity={0.8} />
          {/* <Inspector /> */}
          <directionalLight
            name="red-light"
            direction={new Vector3((-5 * Math.PI) / 4, (-5 * Math.PI) / 4, -Math.PI)}
            intensity={8}
            diffuse={Color3.Red()}
            specular={Color3.Red()}
            ref={setLightRef}
          >
            <shadowGenerator
              mapSize={1024}
              useBlurExponentialShadowMap
              blurKernel={32}
              shadowCastChildren
            >
              <icoSphere name="ico1" position={new Vector3(0, 2, 0)} />
            </shadowGenerator>
          </directionalLight>

          <utilityLayerRenderer>
            <gizmoManager thickness={3} positionGizmoEnabled rotationGizmoEnabled>
              <sphere name="sunMesh" diameter={1}>
                <lightGizmo light={lightRef as DirectionalLight | undefined} updateScale />
              </sphere>
            </gizmoManager>
          </utilityLayerRenderer>
          <ground name="ground1" width={15} height={15} subdivisions={2} receiveShadows />
        </Scene>
      </Engine>
    </div>
  )
}

export default GizmoManager
