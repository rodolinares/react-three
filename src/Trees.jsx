/* eslint-disable react/no-unknown-property */
import { forwardRef, useMemo } from 'react'

import { useGLTF } from '@react-three/drei'
import PropTypes from 'prop-types'
import { Color, Vector3 } from 'three'

import { Shader } from './Shader'

const Trees = forwardRef((props, ref) => {
  const { nodes } = useGLTF('/trees.glb')

  const uniforms = useMemo(
    () => ({
      colorMap: {
        value: props.colors
      },
      brightnessThresholds: {
        value: [0.6, 0.35, 0.001]
      },
      lightPosition: { value: new Vector3(15, 15, 15) }
    }),
    [props.colors]
  )

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.33, -0.05, -0.68]}
      >
        <shaderMaterial attach="material" {...Shader} uniforms={uniforms} />
      </mesh>
    </group>
  )
})

useGLTF.preload('/trees.glb')

Trees.displayName = 'Trees'
Trees.propTypes = { colors: PropTypes.arrayOf(PropTypes.instanceOf(Color)) }
export default Trees
