import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/monitor-sdk.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/monitor-sdk.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/monitor-sdk.umd.js',
      format: 'umd',
      name: 'monitorSDK',
      sourcemap: true
    },
    {
      file: 'dist/monitor-sdk.js',
      format: 'iife',
      name: 'monitorSDK',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({ target: 'es5' }),
    nodeResolve(),
    cjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
