const { remote, shell } = require('electron')

const template = [
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click: () => { shell.openExternal('https://github.com/andreymelkov/aiDocs') }
              }
        ]
    }
]

// Set Mac-specific first menu item
if (process.platform === 'darwin') {

    template.unshift({
      label: remote.app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator'},
        { role: 'services' },
        { type: 'separator'},
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator'},
        { role: 'quit' }
      ]
    })
  }

// Build menu
const menu = remote.Menu.buildFromTemplate(template)

// Set as main app menu
remote.Menu.setApplicationMenu(menu)