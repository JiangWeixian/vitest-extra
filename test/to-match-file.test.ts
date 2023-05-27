import { toMatchFile } from '../src/to-match-file'

import path from 'path'

expect.extend({ toMatchFile })

const f = (type: string) => path.resolve(process.cwd(), './test/fixtures/to-match-file', type)

const snapshot = (type: string) => path.resolve(process.cwd(), './test/__file_snapshots__', type)

describe('is', () => {
  it('compare same file', () => {
    expect(f('a.ts')).toMatchFile(f('a-clone.ts'))
  })

  it('compare files content without filepath', () => {
    expect(f('a.ts')).toMatchFile()
  })

  it('compare files content without virtual filepath', () => {
    expect(f('a.ts')).toMatchFile(snapshot('match-file-virtual'))
  })
})

describe('is not', () => {
  it('compare files content with filepath', () => {
    expect(f('a.ts')).not.toMatchFile(f('b.ts'))
  })

  it('compare files content with filepath', () => {
    expect(f('b.ts')).not.toMatchFile()
  })

  it('compare files content without virtual filepath', () => {
    expect(f('b.ts')).not.toMatchFile(snapshot('match-file-virtual'))
  })
})
