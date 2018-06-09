import aws from 'aws-sdk';

aws.config.accessKeyId = "AKIAJD7CZ72RX3BKPJ3Q";
aws.config.secretAccessKey = "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";
aws.config.region = "us-west-2";


var fromMail = "jose@evolume.com.br";

var ses = new aws.SES();




var params = '';

export function send(name, to, info, type) {

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
        case 'cadastro':
            var ses_mail = "From: 'EVOLUME' <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Confirmação de Cadastro eVolume \n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";

            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá, "+name+"!</h3>";
            ses_mail = ses_mail + "<br/> Recebemos uma solicitação de cadastro para esse e-mail em nossa plataforma.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br> Se você solicitou essa verificação, confirme seu e-mail clicando no link abaixo para confirmar sua identidade. Sua solicitação não será processada, a menos que você confirme o endereço através do link.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<a title='Confirmar meu email' href='http://www.evolume.com.br/confirmacao?id="+ info +"' target='_self'>Confirmar meu email</a>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br> Sua confirmação, expira 24 horas após o seu pedido de confirmação original.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/> Se você NÃO solicitou a confirmação deste endereço de e-mail, não clique no link. Observe que, muitas vezes, a situação não é uma tentativa de phishing, mas um erro de digitação. Se você ainda está preocupado, por favor, encaminhe esta notificação para <strong>contato@evolume.com.br</strong> e avise-nos no encaminhamento de que você não solicitou a verificação.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/> Atenciosamente,";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<strong>A equipe da eVolume - Aluguel de acessórios para carros.</strong>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "</body></html>";

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
            //console.log(data);
        }
    });

};