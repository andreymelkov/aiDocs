let fs = require('fs')
let { PythonShell } = require('python-shell')

module.exports = (file, callback) => {
    fs.readFile(file.path, (err, data) => { 
       
        if(err){ 
          alert("An error ocurred reading the file :" + err.message) 
          return 
        }
        
        let filePath = `${__dirname}/public/${file.name}`
        file.path = filePath

        let options = {
            scriptPath: `${__dirname}/engine/`,
            pythonPath: '/usr/local/bin/python3',
            args: ['-f', filePath]
        }

        // let textUtil = new python('text_util.py', options)

        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');

            PythonShell.run('text_util.py', options, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                // console.log('results: %j', results);
              })

        })

        // handle the file content 
        callback({ file })
         
    })
}