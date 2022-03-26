import type { RawMatchFn, Options } from './types'
import { toMatchFileContent } from './to-match-file-content'

import fs from 'fs'

/**
 * @description compare two file content
 * Snapshot update is not support now, please make sure expected exit and update it manually.
 * @example expect(filepath).toMatchFile(filepath)
 */
export const toMatchFile: RawMatchFn = function (
  received: string,
  expected?: string,
  options: Options = {},
) {
  if (!fs.existsSync(received)) {
    return {
      pass: false,
      message: () => `Please make sure ${received} exit.`,
    }
  }

  const receivedContent = fs.readFileSync(received).toString()

  return toMatchFileContent.bind(this)(receivedContent, expected, options)
}
