import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

const time = performance.now()
for(let i = 0; i < 100_000; i++ ) generate(html)
const finalTime = performance.now()
console.log((finalTime - time) / 100_000, (finalTime - time))
console.log(generate(html))
