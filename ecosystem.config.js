module.exports = {
    apps: [{
        name: "GringottsBankServer",
        script: "./bin/server.js",
        instances: 0,
        exec_mode: "cluster"
    }],
    
    connerctionString: 'mongodb://root:uEPi78UhRHBkYwH@ds023463.mlab.com:23463/gringottsdb'
}

global.SALT = 'zFdG2pVRTHUaGlEMp58L';
global.EMAIL_TMPL = '<strong>{0}</strong>';