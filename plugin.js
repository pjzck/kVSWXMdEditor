// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let wxmd = './src/extension';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function getWebviewContent() {
	return
	`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
			<div>
				<span>hello world</span>
			</div>
        </body>
        </html>
    `;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "k-wx-markdown-editor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('k-wx-markdown-editor.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from k-WX Markdown Editor!');
	});

	let preview = vscode.commands.registerCommand("k-wx-markdown-editor.showPreview", function() {
		vscode.window.showInformationMessage('Hello World from k-WX Markdown Editor!');

		const panel = vscode.window.createWebviewPanel(
			'WXMD-Previewer',
			'微信MD 预览',
			vscode.ViewColumn.One,
			{}
		)

		panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
			<div>
				<span>hello world</span>
			</div>
        </body>
        </html>
    `;
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(preview)

	return {
		extendMarkdownIt(md) {
			return wxmd;
		}
	}
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
