import { toMatchFileContent } from '../src/to-match-file-content'

import path from 'path'
import fs from 'fs'

expect.extend({ toMatchFileContent })

const f = (type: string) =>
  path.resolve(process.cwd(), './test/fixtures/to-match-file-content', type)

const snapshot = (type: string) => path.resolve(process.cwd(), './test/__file_snapshots__', type)

const content = fs.readFileSync(f('a.ts')).toString()

describe('is', () => {
  it('compare same file', () => {
    expect(content).toMatchFileContent(f('input.ts'))
  })

  it('compare files content without filepath', () => {
    expect(content).toMatchFileContent()
  })

  it('compare files content without virtual filepath', () => {
    expect(content).toMatchFileContent(snapshot('match-file-content-virtual'))
  })

  it('compare files content with filepath not match should throw error', () => {
    try {
      expect(content).not.toMatchFileContent(f('output.ts'))
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('compare files content without filepath not match should throw error', () => {
    try {
      const content = fs.readFileSync(f('b.ts')).toString()
      expect(content).not.toMatchFileContent()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('compare files content with virtual filepath', () => {
    try {
      const content = fs.readFileSync(f('b.ts')).toString()
      expect(content).not.toMatchFileContent(snapshot('match-file-content-virtual'))
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})

describe('is not', () => {
  it('compare files content with filepath', () => {
    expect(content).not.toMatchFileContent(f('output.ts'))
  })

  it('compare files content without filepath', () => {
    const content = fs.readFileSync(f('b.ts')).toString()
    expect(content).not.toMatchFileContent()
  })

  it('compare files content with virtual filepath', () => {
    const content = fs.readFileSync(f('b.ts')).toString()
    expect(content).not.toMatchFileContent(snapshot('match-file-content-virtual'))
  })
})
