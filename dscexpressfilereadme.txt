1. Download the files from github which will be downloaded as a zip file
2. Extract the files
3. Copy the folder dscexpressfile to a desktop or to any  drive
4. Open VS Code and open the folder (File->Open Folder) dscexpressfile you just copied

5. Create files blogs.json and userlogin.json (File->new file->navigate to dscexpressfile folder and create here)
6. Right click on the file to get the filepath
7. Copy paste this file path wherever <filepath> is written

Ex: var data = fs.readFileSync('<filepath>', 'utf8'); will be
var data = fs.readFileSync('/home/harshitha/Desktop/dscexpressfile/userlogin.json', 'utf8'); 



5.Open Terminal in VS Code( Terminal->new Terminal)
6. Type the following commands in Terminal

npm init
(keep pressing enter)
npm install express --save
npm install ejs --save
npm install body-parser --save
node index.js

7. Now type localhost:5000/ to run our server 
