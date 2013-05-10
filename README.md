# Sweet Board
A small app that allows users to text a message for display on a screen in real time.

Thanks to Barrell for creating the [original version in php](https://github.com/barrel/sweet-board). This version is a rewrite in python.

## Installation
### Setup Vagrant 
Visit http://downloads.vagrantup.com/ and follow instructions
	
	# Download the VM
	vagrant box add precise64 http://files.vagrantup.com/precise64.box


### Get the code
    git clone https://github.com/joeracker/sweet-board.git

### Set your secrets
    cd sweet-board/sweet-board-src
	mv secrets_example.py secrets.py
    # Add your authtoken and sid
	vim secrets.py 

### Start Vagrant
    vagrant up

### Begin coding
You should now have a running app, available at http://localhost:5050/. The code for the app is in "sweet-board-src".
