const fs = require('fs')

let items  = document.getElementById('docs__items'),
    results_content = document.getElementById('results_content')


exports.readSelectedItem = (currentItem) => {
    if (currentItem === undefined) currentItem = this.getSelectedItem()

    let filePath = `${__dirname}/../public/${this.storage[currentItem.index].file.txt}.txt`

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        results_content.value = data
    });
}

exports.storage = JSON.parse(localStorage.getItem('docs-items')) || []

exports.save = () => {
    localStorage.setItem('docs-items', JSON.stringify(this.storage))
}

exports.addItem = (item, isNew = false) => {
    let itemNode = document.createElement('div')

    itemNode.setAttribute('class', 'item')
    
    f = item.file

    icon = 'rtf.png'
    
    if (f.type == "application/pdf") {
        icon = 'pdf.png'
    } else if (f.type == "image/jpeg") {
        icon = 'jpg.png'
    } else if (f.type == "image/png") {
        icon = 'png.png'
    } else if (f.type == "image/tiff") {
        icon = 'tiff.png'
    } else if (f.type == "image/bmp") {
        icon = 'bpm.png'
    } else if (f.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        icon = 'doc.png'
    }

    itemNode.innerHTML = `<img src="img/${icon}" class="item__img" /><p class="item__text">${item.file.name}</p>`

    items.appendChild(itemNode)

    itemNode.addEventListener('click', this.select)

    if(document.getElementsByClassName('item').length === 1) {
        itemNode.classList.add('selected')
        this.readSelectedItem()
    }

    if (isNew){
        this.storage.push(item)
        this.save()
    }
}

exports.getSelectedItem = () => {
    let currentItem = document.getElementsByClassName('item selected')[0]

    let itemIndex = 0

    let child = currentItem

    while ((child = child.previousSibling) != null) itemIndex++

    return { node: currentItem, index: itemIndex}
}

exports.select = e => {

    let currentItem = this.getSelectedItem()
    
    currentItem.node.classList.remove('selected')

    this.readSelectedItem(currentItem)
    
    e.currentTarget.classList.add('selected')
}

exports.changeSelection = direction => {
    let currentItem = this.getSelectedItem()

    if (direction === 'ArrowUp' && currentItem.node.previousSibling) {
        currentItem.node.classList.remove('selected')
        currentItem.node.previousSibling.classList.add('selected')
    } else if (direction === 'ArrowDown' && currentItem.node.nextSibling) {
        currentItem.node.classList.remove('selected')
        currentItem.node.nextSibling.classList.add('selected')
    }
}

this.storage.forEach(item => {
    this.addItem(item)
});