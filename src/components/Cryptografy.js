import React from 'react';

var CryptoJS = require("crypto-js");

export const Encrypt = (value) => {

    var ciphertext = CryptoJS.AES.encrypt(value, 'evolume');
    return ciphertext.toString();
};

export const Decrypt = (value) => {

    var bytes  = CryptoJS.AES.decrypt(value.toString(), 'evolume');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
};


