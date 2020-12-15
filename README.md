#EPiC learning and engagement tool
##Starting docker containers
First, make sure that docker is running on your computer. After that just type ```npm run docker``` to build and 
start the containers.
##Modifying docker configuration
You can rebuild existing images by typing ```npm run rebuild``` in the terminal.
##Starting backend server
Our server supports auto reload, so you don't have to restart it on every change, it will do this automatically. To start
the server just type ```npm run backend``` into your terminal.
##Starting frontend interpreter (WebPack)
Just like backend server it supports auto reload, to start webpack up type ```npm run frontend``` into your terminal.
##Installing npm modules
```package.json``` located in the root directory is only used for commands intended to run from the host. Modules listed
in this file, will not be installed. To install a module you have to add it to the ```docker.package.json``` file located
in the server_config folder, after that you can run ```npm run install``` command in order to install it in the docker container.