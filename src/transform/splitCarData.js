const fs = require('fs')

let c = fs.readFileSync('./cars_data_final.json')

  c = JSON.parse(c)

console.log(c.length/2)

let out1 = c.slice(0, Math.floor(c.length/2) )
let out2 = c.slice(Math.ceil(c.length/2) )

console.log(out1.length, out1[0])
console.log(out2.length, out2[0])

fs.writeFileSync('cars_data_part1.json', JSON.stringify(out1))
fs.writeFileSync('cars_data_part2.json', JSON.stringify(out2))

return