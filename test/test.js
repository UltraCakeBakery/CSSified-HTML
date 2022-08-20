import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

console.time('generated css')
generate('<div @dark:hover:active:children:before:background="red"></div>')
console.timeEnd('generated css')

