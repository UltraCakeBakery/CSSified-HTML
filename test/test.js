import fs from 'fs'
import generate from '../packages/core/dist/index.js'

const html = fs.readFileSync('./test.html').toString()

const time = performance.now()
for(let i = 0; i < 5000; i++ ) 
    generate(html)
    // console.log(generate(html))
const finalTime = performance.now()
console.log(( finalTime - time ) / 5000)

