# Presenter

[![Icon UnderConstruction](https://raw.githubusercontent.com/MarcelJurtz/ProjectStatusIcons/master/UnderConstruction.png)](https://github.com/MarcelJurtz/ProjectStatusIcons)

Presenter for PowerPoint / similar slideshows. Based on JavaScript / Node using electron.

## Status

Running, Errorlog working.

## ToDo

* Authentification (via IP maybe?)
* Multi-user-functionality?
* Back-button needs to be added to the different functions

## Modules to be installed

* electron
* robotJS for keyboard-automation
* express
* cors

## Installation / RobotJS workaround

I stumbled across an error running robotjs and electron, the following approach works for me:

See [this github issue](https://github.com/octalmage/robotjs/issues/190#issuecomment-245574428)

Required: Installed node-gyp and python set in environment variables.

1. rm -rf Server/node_modules
2. npm install
3. rm -rf Server/node_modules/robotjs
4. npm rebuild
5. npm install robotjs
6. cd Server/node_modules/robotjs
7. node-gyp rebuild --runtime=electron --target=1.7.4 --disturl=https://atom.io/download/atom-shell --abi=48

After that, ```npm start``` should work.
