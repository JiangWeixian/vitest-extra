import { Options } from './dist/types'

export { toMatchDir } from './dist/to-match-dir'
export { toMatchFileContent } from './dist/to-match-file-content'
export { toMatchFile } from './dist/to-match-file'

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface JestAssertion<T = any> {
      toMatchFile: (filename?: string, options?: Options) => void
      toMatchFileContent: (filename?: string, options?: Options) => void
      toMatchDir: (dir?: string, options?: Options) => void
    }
  }
}
