import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { checker } from 'vite-plugin-checker'

function muteWarningsPlugin(warningsToIgnore: string[][]): Plugin {
  const mutedMessages = new Set()
  return {
    name: 'mute-warnings',
    enforce: 'pre',
    config: (userConfig) => ({
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code) {
              const muted = warningsToIgnore.find(([code, message]) => code == warning.code && warning.message.includes(message))

              if (muted) {
                mutedMessages.add(muted.join(','))
                return
              }
            }

            if (userConfig.build?.rollupOptions?.onwarn) {
              userConfig.build.rollupOptions.onwarn(warning, defaultHandler)
            } else {
              defaultHandler(warning)
            }
          },
        },
      },
    }),
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join(',')))
      if (diff.length > 0) {
        this.warn('Some of your muted warnings never appeared during the build process:')
        diff.forEach((m) => {
          this.warn(`- ${m.join(': ')}`)
        })
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    configEnv.mode === 'development' &&
      checker({
        typescript: true,
        eslint: {
          dev: {
            logLevel: ['error'],
          },
          lintCommand: 'eslint --ext .ts,.tsx,.js src --report-unused-disable-directives',
          useFlatConfig: true,
        },
      }),
    muteWarningsPlugin([['SOURCEMAP_ERROR', "Can't resolve original location of error"]]),
  ].filter(Boolean),
  build: {
    sourcemap: true,
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
}))
