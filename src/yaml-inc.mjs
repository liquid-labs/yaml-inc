import * as fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import * as fsPath from 'node:path'

import yaml from 'js-yaml'

const includePathRe = /# include (.+)/

/**
 * Loads a valid YAML file and processes '# include [path]` directives.`The path may be relative (to the including file) or absolute (relative to `options.absRoot`).
 * 
 * @param `filePath` (string) The path to the root YAML file to load
 * @param `options.absRoot` (string) A directory path pre-pended to absolute include paths. Defaults to '/' (or system equivalent)
 * @return The processed data object
 */
const loadYAML = (filePath, options) => {
  const contents = readFileSync(filePath, { encoding: 'utf8' })
  const lines = processContents(contents, { ...options, filePath })
  return yaml.load(lines.join('\n'))
}

const loadYAMLAsync = async(filePath, options) => {
  const contents = await fs.readFile(filePath, { encoding: 'utf8' })
  const lines = processContents(contents, { ...options, filePath })
  return yaml.load(lines.join('\n'))
}

const processContents = (contents, { absRoot = fsPath.sep, filePath }) => {
  const lines = contents.split('\n')
  const processedLines = []
  for (const line of lines) {
    if (line.startsWith('# include ')) {
      let includePath = line.match(includePathRe)[1]
      if (includePath.startsWith('/')) {
        includePath = fsPath.join(absRoot, includePath.slice(1))
      }
      else {
        includePath = fsPath.join(fsPath.dirname(filePath), includePath)
      }
      const incContents = readFileSync(includePath, { encoding: 'utf8' })
      const incDir = fsPath.dirname(includePath)

      const includeLines = processContents(incContents, { absRoot, filePath: incDir })
      processedLines.push(...includeLines)
    }
    else {
      processedLines.push(line)
    }
  }

  return processedLines
}

export { loadYAML, loadYAMLAsync }