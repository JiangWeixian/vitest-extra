import { getDirname, getFilename } from '../src/utils'
import pc from 'picocolors'

describe('get file name', () => {
  it('if expected defined, should return expected', () => {
    const filename = getFilename(
      {
        testPath: 'fixtures/file-name.test.ts',
        assertionCalls: 1,
        currentTestName: 'test',
      },
      'file-name',
    )
    expect(filename).toBe('file-name')
  })

  it('generate filename under __file_snapshots', () => {
    const filename = getFilename({
      testPath: 'fixtures/file-name.test.ts',
      assertionCalls: 1,
      currentTestName: 'test',
    })
    expect(filename).toBe('fixtures/__file_snapshots__/test-1')
  })
})

describe('get dir name', () => {
  it('if expected defined, should return expected', () => {
    const dirname = getDirname(
      {
        testPath: 'fixtures/file-name.test.ts',
        assertionCalls: 1,
        currentTestName: 'test',
      },
      'dir-name',
    )
    expect(dirname).toBe('dir-name')
  })

  it('generate dir under __dir_snapshots', () => {
    const filename = getDirname({
      testPath: 'fixtures/file-name.test.ts',
      assertionCalls: 1,
      currentTestName: 'test',
    })
    expect(filename).toBe('fixtures/__dir_snapshots__/test-1')
  })
})

it('replace ansi color in test name', () => {
  const filename = getFilename({
    testPath: 'fixtures/file-name.test.ts',
    assertionCalls: 1,
    currentTestName: pc.blue('test'),
  })
  expect(filename).toBe('fixtures/__file_snapshots__/test-1')
})
