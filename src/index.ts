/*
  A simple example bun app which reads a file and outputs the number of words in it.
*/
// oxlint-disable no-console

import path from 'node:path'
import { parseArgs } from 'node:util'

const FILE_PATH_ARG_POSITION = 2
const getResolvedPath = (): string => {
  const { positionals } = parseArgs({
    args: Bun.argv,
    allowPositionals: true,
  })
  const filePath = positionals[FILE_PATH_ARG_POSITION]
  if (!filePath) {
    console.log('Provide a valid file path.')
    throw new Error('Invalid file path argument.')
  }
  try {
    const resolvedPath = path.resolve(filePath)
    return resolvedPath
  } catch (err) {
    console.error(err, 'Error while resolving path.')
    throw err
  }
}

const getFileContents = async (filePath: string): Promise<string> => {
  const file = Bun.file(filePath)

  const fileExists = await file.exists()
  if (!fileExists) throw new Error('File does not exists.')

  try {
    const fileContents = await file.text()
    const isValidTextContent = typeof fileContents === 'string'
    if (!isValidTextContent) throw new Error('File cannot be parsed as text content')

    return fileContents
  } catch (err) {
    console.error(err, 'error while reading file contents.')
    throw err
  }
}
const countWords = (content: string): number => {
  const segmenter = new Intl.Segmenter('en', {
    granularity: 'word',
  })
  const segements = segmenter.segment(content)

  return [...segements].filter((seg) => seg.isWordLike).length
}
const main = async () => {
  const filePath = getResolvedPath()
  const fileContents = await getFileContents(filePath)

  console.log(`Your file has ${countWords(fileContents)} words`)
}

main()
export default main
