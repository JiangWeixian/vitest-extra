import type { RawMatchFn, Options } from './types'
import { getFilename } from './utils'

import fs from 'fs-extra'

/**
 * @description compare filecontent with another file
 * Snapshot update is not support now, please make sure expected exit and update it manually.
 * @example expect(filecontent).toMatchFileContent(filepath)
 */
export const toMatchFileContent: RawMatchFn = function (
  received: string,
  expected?: string,
  options: Options = {},
) {
  const { utils, isNot } = this

  const filename = getFilename(
    {
      assertionCalls: this.assertionCalls,
      testPath: this.testPath!,
      currentTestName: this.currentTestName!,
    },
    expected,
  )

  if (!fs.existsSync(filename)) {
    // create file
    if (!isNot) {
      fs.outputFileSync(filename, received)
      return {
        pass: true,
        message: () => ``,
      }
    }
    return {
      pass: true,
      message: () => `Expected File ${filename} don't exit.`,
    }
  }
  const expectedContent = fs.readFileSync(filename).toString('utf-8')

  const diff = utils.diff(received, expectedContent, {
    expand: false,
    contextLines: 5,
    aAnnotation: 'Snapshot',
    ...options.diff,
  })

  if (isNot) {
    return {
      pass: !diff,
      message: () => `Received is matched ${filename}`,
    }
  } else {
    return {
      pass: !diff,
      message: () => `\n${diff}`,
    }
  }
}
