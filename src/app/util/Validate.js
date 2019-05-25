function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePasswd(passwd) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(passwd);
}

function validatePhoneNumber(number) {
    return /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/.test(number);
}

module.exports = {
    validateEmail,
    validatePasswd,
    validatePhoneNumber,
    
}