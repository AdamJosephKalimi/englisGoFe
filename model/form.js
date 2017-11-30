const AV = require('../utils/qiniuUploader.js');

class Form extends AV.Object {
}

AV.Object.register(Form, 'Form');
module.exports = Form;
