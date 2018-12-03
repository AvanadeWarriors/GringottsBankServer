//Desta forma o node encherga estas variaveis em qualque lugar
global.SALT = 'zFdG2pVRTHUaGlEMp58L';
global.EMAIL_TMPL = '<strong>{0}</strong>'; //pensando no futuro quando, a opção de manter cliente estiver ok

//query conection do mongoDB. O mesmo esta hospedado no mLab
module.exports = {
    connerctionString: 'mongodb://root:uEPi78UhRHBkYwH@ds023463.mlab.com:23463/gringottsdb'
}