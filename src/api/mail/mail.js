import aws from 'aws-sdk';
import moment from 'moment';


aws.config.accessKeyId = process.env.AWS_ACCESSKEYID;
aws.config.secretAccessKey = process.env.AWS_SECRETACCESSKEY;
aws.config.region = process.env.AWS_REGION;

var fromMail = "jose@evolume.com.br";

var ses = new aws.SES();

var params = '';

export function send(name, to, info, type) {

    switch (type) {
        case 'contratoLocador':
            var ses_mail = "From: EVOLUME <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Reserva de Equipamento\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";
            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá, " + info.locadorNome + "!</h3>";
            ses_mail = ses_mail + "<br/> Uma reserva foi realizada no dia " + moment().format('DD-MM-YYYY') + " no valor de <strong> R$ " + info.valorTotal + " </strong>.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            ses_mail = ses_mail + "<tr><td>Comprovante de pagamento</td><td></td></tr>";
            ses_mail = ses_mail + "<tr><td>Identificação de compra no eVolume</td><td align='right'>" + info.idPedido + "</td></tr>";
            //ses_mail = ses_mail + "<tr><td>Identificação de pagamento no eVolume</td><td align='right'>"+ info.idPagamento +"</td></tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "Não se esqueça. Será descontado do valor total o percentual de transaçao da <strong>eVolume</strong>.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='100%'>"
            ses_mail = ses_mail + "<tr>";
            ses_mail = ses_mail + "<td>";
            ses_mail = ses_mail + "<img src='"+ info.image+ "' alt='Equipamento Evolume' width='298px' height='298px'/>";
            ses_mail = ses_mail + "</td>";
            ses_mail = ses_mail + "<td>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            ses_mail = ses_mail + "<tr><td>Itens da reserva</td><td>Diárias</td><td>Valor (R$)</td><td>Total (R$)</td></tr>";
            ses_mail = ses_mail + "<tr><td>" + info.descricaoProduto + "</td><td align='right'>" + info.qtdDias + " dias</td><td align='right'> R$ - " + info.valorUnidade + "</td><td align='right'> R$ -" + info.valorTotal + "</td></tr>";
            ses_mail = ses_mail + "<tr><td>Período de aluguel</td><td colspan='3'>De " + info.dataInicial + " Até  " + info.dataFinal + "</td></tr>";
            ses_mail = ses_mail + "<tr><td>Taxas</td><td colspan='3' align='right'>R$ - 00.00 </td></tr>";
            ses_mail = ses_mail + "<tr><td>Total</td><td colspan='3' align='right' >R$ - " + info.valorTotal + "</td></tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "</td>";
            ses_mail = ses_mail + "</tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "<br/>";
            //ses_mail = ses_mail + "<br/>";
            // ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            // ses_mail = ses_mail + "<tr><td>Dados do locatário</td><td></td></tr>";
            // ses_mail = ses_mail + "<tr><td>Nome :</td><td align='right'>" + info.locatarioNome + "</td></tr>";
            // ses_mail = ses_mail + "<tr><td>Email :</td><td align='right'>" + info.locatarioEmail + "</td></tr>";
            // ses_mail = ses_mail + "<tr><td>Telefone :</td><td align='right'>" + info.locatarioTelefone + "</td></tr>";
            // ses_mail = ses_mail + "</table>";
            ses_mail = ses_mail + "<br/>";
            //ses_mail = ses_mail + "A equipe eVolume irá entrar em contato com você para passar maiores informações.";
            ses_mail = ses_mail + "A equipe eVolume irá entrar em contato com você para passar maiores informações.";
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
        case 'contratoLocatario':
            var ses_mail = "From: EVOLUME <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Reserva de Equipamento\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";
            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá, " + info.locatarioNome + "!</h3>";
            ses_mail = ses_mail + "<br/> A sua reserva realizado no dia " + moment().format('DD-MM-YYYY') + " no valor de <strong> R$ " + info.valorTotal + " </strong> está em <strong> análise </strong>!";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            ses_mail = ses_mail + "<tr><td>Comprovante de pagamento</td><td></td></tr>";
            ses_mail = ses_mail + "<tr><td>Identificação de compra no eVolume</td><td align='right'>" + info.idPedido + "</td></tr>";
            ses_mail = ses_mail + "<tr><td>Identificação de pagamento no eVolume</td><td align='right'>" + info.idPagamento + "</td></tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "Não se esqueça. Esse pagamento será exibido no extrato do seu cartão de crédito como <strong>*eVolume</strong>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='100%'>"
            ses_mail = ses_mail + "<tr>";
            ses_mail = ses_mail + "<td>";
            ses_mail = ses_mail + "<img src='"+ info.image+ "' alt='Equipamento Evolume' width='298px' height='298px'/>";
            ses_mail = ses_mail + "</td>";
            ses_mail = ses_mail + "<td>";
            ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            ses_mail = ses_mail + "<tr><td>Itens da reserva</td><td>Diárias</td><td>Valor (R$)</td><td>Total (R$)</td></tr>";
            ses_mail = ses_mail + "<tr><td>" + info.descricaoProduto + "</td><td align='right'>" + info.qtdDias + " dias</td><td align='right'> R$ - " + info.valorUnidade + "</td><td align='right'> R$ -" + info.valorTotal + "</td></tr>";
            ses_mail = ses_mail + "<tr><td>Período de aluguel</td><td colspan='3'>De " + info.dataInicial + " Até  " + info.dataFinal + "</td></tr>";
            ses_mail = ses_mail + "<tr><td>Taxas</td><td colspan='3' align='right'>R$ - 00.00 </td></tr>";
            ses_mail = ses_mail + "<tr><td>Total</td><td colspan='3' align='right' >R$ - " + info.valorTotal + "</td></tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "</td>";
            ses_mail = ses_mail + "</tr>";
            ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "<br/>";
            // ses_mail = ses_mail + "<br/>";
            // ses_mail = ses_mail + "<table cellspacing='0' cellpadding='0' border='0' width='500'>"
            // ses_mail = ses_mail + "<tr><td>Dados do locador</td><td></td></tr>";
            // ses_mail = ses_mail + "<tr><td>Nome :</td><td align='right'>" + info.locadorNome + "</td></tr>";
            // ses_mail = ses_mail + "<tr><td>Email :</td><td align='right'>" + info.locadorEmail + "</td></tr>";
            // ses_mail = ses_mail + "<tr><td>Telefone :</td><td align='right'>" + info.locadorTelefone + "</td></tr>";
            // ses_mail = ses_mail + "</table> ";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "A equipe eVolume irá entrar em contato com você para passar maiores informações.";
            //ses_mail = ses_mail + "Por favor, entre em contato com o locador para verificar a melhor hora de buscar o equipamento.";
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
        case 'cadastro':
            var ses_mail = "From: EVOLUME <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Confirmação de cadastro eVolume \n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";

            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá, " + name + "!</h3>";
            ses_mail = ses_mail + "<br/> Recebemos uma solicitação de cadastro para esse e-mail em nossa plataforma.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br> Se você solicitou essa verificação, confirme seu e-mail clicando no link abaixo para confirmar sua identidade. Sua solicitação não será processada, a menos que você confirme o endereço através do link.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<a title='Confirmar meu email' href='http://www.evolume.com.br/confirmacao?id=" + info + "' target='_self'>Confirmar meu email</a>";
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
        case 'reset':
            var ses_mail = "From: EVOLUME <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Reset de senha - eVolume \n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";

            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá!</h3>";
            ses_mail = ses_mail + "<br/> Recebemos uma solicitação de reset de senha para esse e-mail em nossa plataforma.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br> Se você solicitou essa verificação, confirme seu e-mail clicando no link abaixo para confirmar sua identidade. Sua solicitação não será processada, a menos que você confirme o endereço através do link.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<a title='Confirmar meu email' href='http://www.evolume.com.br/novasenha?id=" + info + "' target='_self'>Reiniciar minha senha</a>";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br> Sua confirmação, expira 24 horas após o seu pedido de confirmação original.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/> Se você NÃO solicitou o reset de senha, não clique no link. Observe que, muitas vezes, a situação não é uma tentativa de phishing, mas um erro de digitação. Se você ainda está preocupado, por favor, encaminhe esta notificação para <strong>contato@evolume.com.br</strong> e avise-nos no encaminhamento de que você não solicitou o reset da senha pessoal.";
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
        case 'resetConfirm':
            var ses_mail = "From: EVOLUME <" + fromMail + ">\n";
            ses_mail = ses_mail + "To: " + to + "\n";
            ses_mail = ses_mail + "Subject: Confirmação de reset de senha - eVolume \n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=utf-8\n\n";
            
            ses_mail = ses_mail + "<html><head><meta charset='utf-8'/><title>Evolume - Aluguel de acessório para carros</title><body>";
            ses_mail = ses_mail + "<h3>Olá, " + name + "!</h3>";
            ses_mail = ses_mail + "<br/> Reset de senha realizado na plataforma.";
            ses_mail = ses_mail + "<br/>";
            ses_mail = ses_mail + "<br/> Se você NÃO solicitou o reset de senha, não clique no link. Observe que, muitas vezes, a situação não é uma tentativa de phishing, mas um erro de digitação. Se você ainda está preocupado, por favor, encaminhe esta notificação para <strong>contato@evolume.com.br</strong> e avise-nos no encaminhamento de que você não solicitou o reset da senha pessoal.";
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
           // console.log(data);
        }
    });

};