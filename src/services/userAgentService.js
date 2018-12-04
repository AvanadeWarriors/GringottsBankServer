'user strict'
 
exports.getIpCustomer = (req, res, next) => {
    let forwardedIpsStr = req.connection.remoteAddress;
    console.log(forwardedIpsStr);
    return forwardedIpsStr;
}
 
exports.getUserAgent = (req, res, next) => {
    let userAgent = req.headers['user-agent'];
    console.log(userAgent);
    return userAgent;
}