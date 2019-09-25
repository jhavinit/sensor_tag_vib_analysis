# SensorTag Vibrational Analysis

## Steps

### Step 1:
Get the code from gihub: https://github.com/sandeepmistry/node-sensortag

### Step 2: 
Change USE_READ = 1 rather than true

### Step 3:
Install python2+,nodejs,npm

### Step 4:
Run the command "npm install sensortag"

### Step 5:
Chek out:
https://github.com/nodejs/node-gyp#installation
https://github.com/noble/noble#prerequisites

### Step 6:
Install node-gyp: "npm install -g node-gyp"

#### Preq:
python (v2.7 recommended, v3.x.x is not supported)
make
A proper C/C++ compiler toolchain, like GCC
#### Configuring Python Dependency
"node-gyp --python /path/to/python2.7"
"npm config set python /path/to/executable/python2.7"

### Step 7:

Linux
Kernel version 3.6 or above
libbluetooth-dev

Install noble: "sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev"
then "sudo ln -s /usr/bin/nodejs /usr/bin/node"
"npm install noble"
"sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)"
