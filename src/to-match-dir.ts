import { RawMatchFn } from './types'
import { getDirname, debug } from './utils'

import fs from 'fs-extra'
import { globbySync } from 'globby'
import path from 'path'
import { isEmpty } from 'lodash-es'

export const glob = (cwd: string) => {
  return globbySync(['**'], { cwd, gitignore: true, dot: true, ignore: ['.git'] })
}

// NOTE: if use it with `.not`, pass: false mean case success
/**
 * @description compare two dirs files count, and file content
 * @example expect(dirpath).toMatchDir(dirpath)
 */
export const toMatchDir: RawMatchFn = function (received: string, expected?: string) {
  const isNot = this.isNot ?? false

  const dirname = getDirname(
    {
      assertionCalls: this.assertionCalls,
      testPath: this.testPath!,
      currentTestName: this.currentTestName!,
    },
    expected,
  )
  debug.toMatchDir('case `%s` options: %o', this.currentTestName, { isNot })
  debug.toMatchDir('snapshot dirname %s', dirname)

  if (!fs.existsSync(received)) {
    return {
      pass: isNot,
      message: () => `Please make sure received dir ${received} exit.`,
    }
  }

  if (!dirname || !fs.existsSync(dirname)) {
    // If run at first time, snapshot dir is empty
    // Copy received to target
    if (!isNot) {
      fs.copySync(received, dirname)
      return {
        pass: true,
        message: () => '',
      }
    }
    return {
      pass: true,
      message: () => `Please make sure expected dir ${dirname} exit.`,
    }
  }

  const [receivedFiles, expectedFiles] = [received, dirname].map((cwd) => {
    return glob(cwd)
  })

  // compare dir files length
  const receivedFilesSnapShot = receivedFiles.sort().join('\n')
  const expectedFilesSnapShot = expectedFiles.sort().join('\n')

  const fileListDiff = this.utils.diff(receivedFilesSnapShot, expectedFilesSnapShot)

  if (fileListDiff) {
    // Should pass: false if call expect with .not.toMatchDir()
    return {
      pass: false,
      message: () => fileListDiff,
    }
  }

  let matchFiles: string[] = []

  // check (input & output) file list snapshot
  if (!isNot) {
    receivedFiles.some((file) => {
      const receivedFilePath = path.resolve(received, file)
      const expectedFilePath = path.resolve(dirname, file)
      const isDifferent = this.utils.diff(
        fs.readFileSync(receivedFilePath).toString(),
        fs.readFileSync(expectedFilePath).toString(),
      )
      if (isDifferent) {
        matchFiles = [receivedFilePath, expectedFilePath]
      }
      return isDifferent
    })
    return {
      pass: isEmpty(matchFiles),
      message: () => `${matchFiles[0]} not match ${matchFiles[1]}`,
    }
  }

  let diff = ''

  // filecontent should not equal file by file
  receivedFiles.every((file) => {
    const receivedFilePath = path.resolve(received, file)
    const expectedFilePath = path.resolve(dirname, file)
    diff = this.utils.diff(
      fs.readFileSync(receivedFilePath).toString(),
      fs.readFileSync(expectedFilePath).toString(),
    )
    return !!diff
  })

  return {
    pass: !diff,
    message: () => `${received} match ${dirname}`,
  }
}
