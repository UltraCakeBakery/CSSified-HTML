import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

const interations = 100_000

const time = performance.now()
const generated = generate(html)
const finalTime = performance.now()
console.log(generated)
console.log(finalTime - time)

// console.log( 'generated css: ' + (( new Date() - time ) / interations ) + 'ms average' )

