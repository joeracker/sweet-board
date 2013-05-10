Sweet Board
===========

INSTALL:
# Download and install Vagrant from http://downloads.vagrantup.com/

# Get the code
> git clone https://github.com/joeracker/sweet-board.git
? wget Vagrantfile

# Get the base virtual Box VM
> vagrant box add precise64 http://files.vagrantup.com/precise64.box

# Setup cookbooks
cd sweet-board
mkdir cookbooks; cd cookbooks
> git clone https://github.com/opscode-cookbooks/apt.git
> git clone https://github.com/opscode-cookbooks/python.git
> git clone https://github.com/opscode-cookbooks/build-essential.git

# Start Vagrant
> vagrant up

# Begin coding in sweet-board-src
