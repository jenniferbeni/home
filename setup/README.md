# Home Setup

Obsidian is cool. (We're NOT currently using it in the home repo.)
Syncs your Markdown notes from your local Obsidian to GitHub as a backup.

## Connect Obsidian with your Github repo
[The Easiest Way to Connect Your Obsidian Vault](https://linked-blog-starter.vercel.app/connect-obsidian-vault-with-github) with guilded steps. 

You can set up automatic pulls from the repository and enable autosave by navigating to Settings -> Community Plugins -> Git. You have the option to let it auto-save, or you can manually update by Ctrl + P to open the command palette and typing 'backup'. This will automatically commit and push your changes to the repository.

If you only need to back up one specific folder to the repository, you can follow the instructions mentioned earlier. However, if you want to back up the entire vault, you'll need to create a new vault and remove the welcome.md file. After that, proceed with the backup process. When specifying the file location, use the path **/** to represent the current vault folder.

## Useful Obsidian Plugin
1. GIT: obsidian://show-plugin?id=obsidian-git
2. Enhancing Export for exporting different file formats: obsidian://show-plugin?id=obsidian-enhancing-export
3. Code emmitter for running code within code blocks: obsidian://show-plugin?id=code-emitter
4. HTML Reader for loading .html type file: obsidian://show-plugin?id=obsidian-html-plugin