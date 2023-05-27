import { toMatchDir, glob } from '../src/to-match-dir'

import path from 'path'

/**
 * @description Resolve input dir and expected dir
 * @param received
 * - false expected dir
 * - true input dir
 */
const f = (type: string, received = true) =>
  path.resolve(process.cwd(), './test/fixtures/to-match-dir', type, received ? 'input' : 'output')

const snapshot = (type: string) => path.resolve(process.cwd(), './test/__dir_snapshots__', type)

expect.extend({ toMatchDir })

describe('glob', () => {
  it('should include dot files', async () => {
    const files = glob(process.cwd())
    expect(files.some((v) => v.includes('.github'))).toBe(true)
  })
})

describe('is', () => {
  it('compare same dirs', () => {
    expect(f('clone')).toMatchDir(f('clone', false))
  })

  it('compare dirs without dir', () => {
    expect(f('clone')).toMatchDir()
  })

  it('compare dirs with virtual dir', () => {
    expect(f('clone')).toMatchDir(snapshot('match-dir-virtual'))
  })

  it('compare dirs, file count not match', () => {
    try {
      expect(f('file-count')).toMatchDir(f('file-count', false))
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('compare dirs, file list not match', () => {
    try {
      expect(f('file-list')).toMatchDir(f('file-list', false))
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('compare dirs, file content not match', () => {
    try {
      expect(f('file-content')).toMatchDir(f('file-content', false))
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('is not', () => {
  it('compare dirs, file count not match', () => {
    expect(f('file-count')).not.toMatchDir(f('file-count', false))
  })

  it('compare dirs, file list not match', () => {
    expect(f('file-list')).not.toMatchDir(f('file-list', false))
  })

  it('compare dirs, file content not match', () => {
    expect(f('file-content')).not.toMatchDir(f('file-content', false))
  })

  it('compare dirs without dir', () => {
    expect(f('file-content')).not.toMatchDir()
  })

  it('compare dirs without virtual dir', () => {
    expect(f('file-content', false)).not.toMatchDir(snapshot('match-dir-virtual'))
  })
})
