# vitest-extra
*provider extra match for vitest*

[![npm](https://img.shields.io/npm/v/vitest-extra)](https://github.com/JiangWeixian/vitest-extra) [![GitHub](https://img.shields.io/npm/l/vitest-extra)](https://github.com/JiangWeixian/vitest-extra)

## usage

```console
pnpm i vitest-extra -D
```

extend extra functions

```ts
import { toMatchFile, toMatchFileContent, toMatchDir } from 'vitest-extra'
import { expect } from 'vitest'

expect.extend({ toMatchFile, toMatchFileContent, toMatchDir })
```

## features

provide follow extra functions:

### `toMatchFile`

compare file with expected file, e.g. `expect(filepath).toMatchFile(filepath)`.

If expected not exit, create snapshot under `__file_snapshots__`

### `toMatchFileContent`

compare file's content with expected file, e.g. `expect(content).toMatchFile(filepath)`.

If expected not exit, create snapshot under `__file_snapshots__`

### `toMatchDir` 

compare dir's content and names with expected dir, e.g. `expect(dir).toMatchFile(dir)`.

If expected not exit, create snapshot under `__dir_snapshots__`

## development

- **Setup** - `pnpm i`
- **Build** - `pnpm build`

# 
<div align='right'>

*built with ❤️ by 😼*

</div>

