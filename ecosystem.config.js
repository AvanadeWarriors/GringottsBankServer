module.exports = {
    apps: [{
        name: "GringottsBankServer",
        script: "./bin/server.js",
        instances: 0,
        exec_mode: "cluster"
    }],
    
    connectionString: 'mongodb://root:uEPi78UhRHBkYwH@ds023463.mlab.com:23463/gringottsdb',
    connectionStringTest: 'mongodb://root:uEPi78UhRHBkYwH@ds056288.mlab.com:56288/gringottsdb-test'
}

global.SALT = 'zFdG2pVRTHUaGlEMp58L';
global.EMAIL_TMPL = '<strong>{0}</strong>';