import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    plugins: [
      svgr({
        include: '**/*.svg',
        exclude: '',
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
  };

  if (command === 'serve') {
    config.server = {
      proxy: {
        '/api': 'http://localhost:5005',
      },
    };
  }

  return config;
});
