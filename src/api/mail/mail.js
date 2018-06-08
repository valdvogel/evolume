import aws from 'aws-sdk';

aws.config.accessKeyId = "AKIAIUE2FCM3XMKZ5HYA";
aws.config.secretAccessKey = "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";
aws.config.region = "us-west-2";


var fromMail = "jose@evolume.com.br";

var ses = new aws.SES();




var params = '';

export function send(to, info, type) {

    switch (type) {
        case 'contrato':
            var ses_mail = "From: 'EVOLUME' <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Reserva de Equipamento\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
            //ses_mail = ses_mail + "DADOS DA COMPRA:" + info + "\n";
            ses_mail = ses_mail + "<html><body><img alt='' src='https://s3.us-east-2.amazonaws.com/evolumewebappimages/logo.jpg'/>"+ info +"</body></html>";
            //ses_mail = ses_mail + "This is the body of the email.\n\n";
            //ses_mail = ses_mail + "--NextPart\n";
            // ses_mail = ses_mail + "Content-Type: text/plain;\n";
            // ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
            // ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
            ses_mail = ses_mail + "--NextPart--";

            params = {
                RawMessage: { Data: new Buffer(ses_mail) },
                Destinations: [to],
                Source: "'eVolume' <" + fromMail + ">'"
            };
            break;
        default:
            console.log('Parametro inválido!')
    }
    ses.sendRawEmail(params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });

};