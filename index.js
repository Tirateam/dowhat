const fs = require('fs')
const exec = require('child_process').exec;

function handle(err, stdout, stderr) {
    if(err) console.log(err)
    if(stderr) console.log(stderr)
    if(stdout) console.log(stdout)
}

let lets = []
fs.readFile(process.cwd() + '/do.what', (err, content) => {
    content = content.toString()
    if(!content) throw new Error('File must contain something')

    content.split('\n').filter(line => line.trim() != "" && !line.startsWith("#")).forEach(l => {
        lets.forEach(variable => {
            l = l.replaceAll(`@${variable.name}@`, variable.equals)
        })


        if(l.startsWith("@")) {
            let varu = l.split("=")[0].substring(1).trim()
            let alreadythere = lets.find(l => l.name == varu)
            let equals = l.split("=")[1].trim()
            if(alreadythere) return alreadythere.equals = eval(equals)
            return lets.push({name:varu, equals:eval(equals)})
        } else if(l.startsWith("[")&& l.includes("if") && l.includes("]")) {
            let splitter = l.split("]")
            let expression = splitter[0].substring(1)
            let execute = splitter[1].substring(1)

            eval(`${expression} {
                exec(${JSON.stringify(execute)}, (err, stdout, stderr) => {
                    handle(err, stdout, stderr)
                }) 
            }`)
        } else if(l.startsWith("{") && l.includes("}")) {
            let splitter = l.split("}");
            let what = splitter[0].substring(1);
            let execute = splitter[1];

            eval(`if (process.argv.includes(${JSON.stringify(what)})) {
                exec(${JSON.stringify(execute)}, (err, stdout, stderr) => {
                    handle(err, stdout, stderr)
                })
            }`)
        } else {

            exec(l, (err, stdout, stderr) => {
                handle(err, stdout, stderr)
            })
        }
    })
})
