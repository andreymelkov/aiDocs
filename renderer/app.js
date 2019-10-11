const { ipcRenderer } = require('electron')
const items = require("./items")

let holder = document.getElementById('upload');

holder.ondragover = () => {
    holder.classList.add('upload-over')
    return false;
}

holder.ondragleave = () => {
    holder.classList.remove('upload-over')
    return false;
}

holder.ondragend = () => {
    return false;
}

holder.ondrop = (e) => {
    e.preventDefault();

    for (let f of e.dataTransfer.files) {
        if (f.type == "application/pdf" || f.type == "image/jpeg" || f.type == "image/png" || f.type == "image/tiff" || f.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            // console.log('File(s) you dragged here: ', f)
            switch (f.type) {
                case "application/pdf": 
                    name = f.name.replace('.pdf', '')
                    break
                case "image/jpeg": 
                    name = f.name.replace('.jpeg', '')
                    name = f.name.replace('.jpg', '')
                    break
                case "image/png": 
                    name = f.name.replace('.png', '')
                    break
                case "image/tiff":
                    name = f.name.replace('.png', '')
                    break
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    name = f.name.replace('.docx', '')
                    name = f.name.replace('.doc', '')
                    name = f.name.replace('.rtf', '')
                    break
                default:
                    name = 'test'
                    break
            }
            fileData = {
                path: f.path,
                name: f.name,
                type: f.type,
                txt: name
            }
            ipcRenderer.send('ondragstart', fileData)
        } else {
            console.log(`File(s) format ${f.type} doesn't support!`)
        }
    }
    holder.classList.remove('upload-over')
    return false;
}

ipcRenderer.on('file-uploaded-sucess', (e, newItem) => {
    items.addItem(newItem, true)
})