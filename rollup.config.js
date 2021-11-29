import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const extensions = ['.ts'];

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', indent: false },
    {
      file: pkg.module,
      format: 'esm',
      indent: false,
    },
  ],
  plugins: [
    resolve({
      extensions,
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
