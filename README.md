# Sweet Board
A small app that allows users to text a message for display on a screen in real time.

Thanks to Barrell for creating the [original version in php](https://github.com/barrel/sweet-board). This version is a rewrite in python.

## Installation
### Setup Vagrant 
Visit http://downloads.vagrantup.com/ and follow instructions
	
	# Download the VM
	vagrant box add precise64 http://files.vagrantup.com/precise64.box


### Get the code
    # Clone the code
    git clone https://github.com/joeracker/sweet-board.git
    # setup dependant submodules
    cd sweet-board
    git submodule init
    git submodule update


### Set your secrets
    cd sweet-board/sweet-board-src
	mv secrets_example.py secrets.py
    # Add your authtoken and sid
	vim secrets.py 

### Start Vagrant
    # Complete this from the base directory of the repo
    vagrant up

### Start the app
    vagrant ssh
	cd /sweet-board-src/
	gunicorn -w 4 -b 0.0.0.0:5000 sweetboard:app
        
        # You can also use the Python web server
        # python sweetboard.py

Gunicorn can be run as a daemon with the --daemon switch:

    gunicorn -w 4 -b 0.0.0.0:5000 sweetboard:app --daemon


### Begin coding
You should now have a running app, available at http://localhost:5050/. The code for the app is in "sweet-board-src".
