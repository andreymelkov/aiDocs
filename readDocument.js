let fs = require('fs')

module.exports = (file, callback) => {
    fs.readFile(file.path, (err, data) => { 
       
        if(err){ 
          alert("An error ocurred reading the file :" + err.message) 
          return 
        }
        
        let filePath = `${__dirname}/public/${file.name}`
        file.path = filePath

        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        })
        // handle the file content 
        callback({ file })
         
    })
}