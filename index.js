const fs = require('fs')
const exec = require('child_process').exec;

function handle(err, stdout, stderr) {
    if(err) console.log(err)
    if(stderr) console.log(stderr)
    if(stdout) console.log(stdout)
}

fs.readFile(process.cwd() + '/do.what', (err, content) => {
    if(!content) throw new Error('File must contain something')
    content = content.toString()

    content.split('\n').filter(line => line.trim() != "" && !line.startsWith("#")).forEach(l => {
        if(l.startsWith("{") && l.includes("}")) {
            let splitter = l.split("}");
            let what = splitter[0].substring(1);
            let execute = splitter[1];

            eval(`if (process.argv.includes(${JSON.stringify(what)})) {
                exec(${JSON.stringify(execute)}, (err, stdout, stderr) => {
                    handle(err, stdout, stderr)
                })
            }`)
        } else exec(l, (err, stdout, stderr) => {
            handle(err, stdout, stderr)
        })
    })
})
