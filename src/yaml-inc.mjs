import * as fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import * as fsPath from 'node:path'

import yaml from 'js-yaml'

const includePathRe = /# include (.+)/

const loadYAML = (filePath, options) => {
  const contents = readFileSync(filePath, { encoding: 'utf8' })
  const lines = processContents(contents, { filePath, ...options })
  return yaml.load(lines.join('\n'))
}

const loadYAMLAsync = async(filePath, options) => {
  const contents = await fs.readFile(filePath, { encoding: 'utf8' })
  const lines = processContents(contents, { filePath, ...options })
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