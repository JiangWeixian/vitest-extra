import path from 'path'
import { kebabCase } from 'lodash-es'
import Debug from 'debug'

// eslint-disable-next-line no-control-regex
const ANSI_COLOR = /[\u001B\u009B][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g

export const getFilename = (
  ctx: {
    testPath: string
    currentTestName: string
    assertionCalls: any
  },
  expected?: string,
) => {
  const formattedTestName = ctx.currentTestName.replace(ANSI_COLOR, '')
  const filename =
    expected === undefined
      ? path.join(
          path.dirname(ctx.testPath),
          '__file_snapshots__',
          `${kebabCase(formattedTestName)}-${ctx.assertionCalls}`,
        )
      : expected
  return filename
}

/**
 * @description Resolve dir snapshot dirpath
 */
export const getDirname = (
  ctx: {
    testPath: string
    currentTestName: string
    assertionCalls: any
  },
  expected?: string,
) => {
  const formattedTestName = ctx.currentTestName.replace(ANSI_COLOR, '')
  const filename =
    expected === undefined
      ? path.join(
          path.dirname(ctx.testPath),
          '__dir_snapshots__',
          `${kebabCase(formattedTestName)}-${ctx.assertionCalls}`,
        )
      : expected
  return filename
}

export const debug = {
  toMatchDir: Debug('vitest-extra:to-match-dir'),
}
