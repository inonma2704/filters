import path from 'node:path'

type TransformedSource = {
  code: string
  map?: string | null
}

interface SyncTransformer {
  process: (sourceText: string, sourcePath: string) => TransformedSource
}

const svgTransformer: SyncTransformer = {
  process(sourceText, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    }
  },
}

export default svgTransformer
