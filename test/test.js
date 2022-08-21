import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

console.time('generated css')
const generated = generate(html)
console.timeEnd('generated css')

console.log(generated)