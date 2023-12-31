/* global describe expect test */
import * as fsPath from 'node:path'

import { loadYAML, loadYAMLAsync } from '../yaml-inc'

const simplePath = fsPath.join(__dirname, 'data', 'simple.yaml')
const expectedSimple = {
  foo  : 'foo',
  bar  : 'bar',
  list : [1, 2]
}

const includeSimplePath = fsPath.join(__dirname, 'data', 'include-simple.yaml')
const expectedIncludeSimple = Object.assign({ baz : 'baz' }, expectedSimple, { boo : 'boo' })

const doubleIncludePath = fsPath.join(__dirname, 'data', 'double-include.yaml')
const expcetedDoubleInclude = Object.assign({ third : 3 }, expectedIncludeSimple)

const absIncludePath = fsPath.join(__dirname, 'data', 'abs-include.yaml')
const expectedAbsInclude = Object.assign({ abs : true }, expectedSimple)

describe('yamlLoad', () => {
  test('loads a standard YAML file', () => expect(loadYAML(simplePath)).toEqual(expectedSimple))

  test('processes a 1st level include', () => expect(loadYAML(includeSimplePath)).toEqual(expectedIncludeSimple))

  test('handles nested includes', () => expect(loadYAML(doubleIncludePath)).toEqual(expcetedDoubleInclude))

  test('handles absolute includes', () => expect(loadYAML(absIncludePath, { absRoot : __dirname })).toEqual(expectedAbsInclude))
})

describe('yamlLoadAsync', () => {
  test('loads a standard YAML file', async() => expect(await loadYAMLAsync(simplePath)).toEqual(expectedSimple))

  test('processes a 1st level include', async() =>
    expect(await loadYAMLAsync(includeSimplePath)).toEqual(expectedIncludeSimple))

  test('handles nested includes', async() =>
    expect(await loadYAMLAsync(doubleIncludePath)).toEqual(expcetedDoubleInclude))

  test('handles absolute includes', async() =>
    expect(await loadYAMLAsync(absIncludePath, { absRoot : __dirname })).toEqual(expectedAbsInclude))
})
