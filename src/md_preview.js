const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const md_runtime = require('./md_runtime');

var panel;
let iteration = 0;

const currentPanels = new Map();

const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

const initJS = `
function initEventListener(fn) {
    window.addEventListener('message', event => {
        const data = event.data;
        if (data.type === 'list') {

        } else {
            console.log(data.id + data.content)
            let element = document.getElementById(data.id);
            element.innerHTML = data.content;
        }
    })

	// window.addEventListener('message', event => {
	// 	const message = event.data;
	// 	if (message.command.match(/Response$/) && message.contents) {
	// 		message.contents.forEach(content => {
	// 			let element = document.getElementById(content.id);
	// 			element.innerHTML = content.body;
	// 		});
	// 	} else {
	// 		if (fn) {
	// 			fn(message);
	// 		}
	// 	}
	// });
}
`;

function initPreviewPage(context) {
	const name = vscode.window.activeTextEditor.document.fileName;

    const localResourceRoot = vscode.Uri.file(path.join(context.extensionPath, 'src', "/")).with({ scheme: 'vscode-resource' })
    panel = vscode.window.createWebviewPanel(
        'WXMD-Previewer',
        '微信MD 预览',
        vscode.ViewColumn.Two,
        {
            enableScripts: true,
            localResourceRoots: [localResourceRoot]
        }
    );

    panel.webview.html = fs.readFileSync(path.join(context.extensionPath, 'src', 'md_preview.html'), 'utf8')
        .replace('{{css_list}}', fs.readFileSync(path.join(context.extensionPath, 'src', 'media', 'css', 'css_list'), 'utf-8'))
        .replace('{{base}}', localResourceRoot.toString())
        .replace('"{{init}}"', initJS);

    // const htmlOnDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'md_preview.html'))
    // const finalHtmlPath = htmlOnDiskPath.with({scheme : 'vscode-resource'})

    iteration = 0;
    updatePreviewPage();
    const interval = setInterval(() => {
       updatePreviewPage() 
    }, 1000);

    panel.onDidDispose(() => {
        clearInterval(interval);
    },
        null,
        context.subscriptions
    );

    return { panel, interval };
}

function updatePreviewPage() {
    // const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
    // panel.title = cat;
    panel.webview.postMessage({ 
        type: 'content',
        id: 'preview',
        content : md_runtime.render(vscode.window.activeTextEditor.document.getText())
    });
}

module.exports = {
    initPreviewPage,
    updatePreviewPage
};
