import type { expect } from 'vitest'

export type RawMatchFn = Parameters<typeof expect['extend']>[0][string]
type MatchState = ThisParameterType<RawMatchFn>
type DiffOptions = Parameters<MatchState['utils']['diff']>[2]

export type Options = {
  diff?: DiffOptions
}
