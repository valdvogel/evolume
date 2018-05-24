import React from 'react';
import { Link } from 'react-router-dom'

const ProductMain = () => (
    <section id="three" className="wrapper special">
        <div className="inner">
            <header className="align-center">
                <h2>Produtos</h2>
            </header>
            <div className="flex flex-2">
                <article>
                    <Link to='/locatario/engate bike'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/e2.jpg" />
                        </div>
                        <h2>Engates para bicicleta</h2>
                    </Link>
                    <p>Engates de bicicleta são a maneira mais fácil de carregar várias bicicletas em seu veículo. Transportar bicicletas atrás do seu carro é simples com qualquer um dos racks dessa categoria. Certifique-se de escolher o tamanho adequado do receptor de engate assim como que o engate possa suportar o peso de todas as bicicletas que você deseja transportar.</p>
                </article>
                <article>
                    <Link to='/locatario/rack bike'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/b3.jpg" />
                        </div>
                        <h2>Rack de Teto para bicicleta</h2>
                    </Link>
                    <p>Os racks de teto para bicicleta permitem transportar entre uma ou mais bicicletas no teto do seu carro dependendo do peso e largura do seu veículo. Racks de teto para bicicleta exigem uma base instalada ou um rack de teto existente de fábrica pelo fabricante para montagem. Dê uma olhada nos racks abaixo para encontrar a melhor solução para o seu passeio.</p>
                </article>
                <article>
                    <Link to='/locatario/suporte transbike'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/b4.jpg" />
                        </div>
                        <h2>Suporte Transbike</h2>
                    </Link>
                    <p>Os suportes transbike em porta-malas são os suportes mais econômicos e versáteis disponíveis. Esses suportes de cinta são montados com ganchos no porta-malas, apertados com tiras. Se você não tiver uma base no teto, um suporte transbike no porta-malas pode ser sua melhor opção para transportar até três bicicletas.</p>
                </article>
                <article>
                    <Link to='/locatario/bagageiro box'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/b5.jpg" />
                        </div>
                        <h2>Bagageiros Box</h2>
                    </Link>
                    <p>Bagageiros Box são a maneira ideal de transportar seus equipamentos. Mantenha o interior do seu carro limpo e claro, sem ter que deixar nada em casa. Todas os bagageiros box disponíveis têm garantia de qualidade premium para manter seu equipamento seguro e seco, não importando o quão longe seu destino esteja. Confira nossos vários tamanhos e estilos para atender às suas necessidades.</p>
                </article>
                <article>
                    <Link to='/locatario/bagageiro carga'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/c4.jpg" />
                        </div>
                        <h2>Bagageiros de Carga</h2>
                    </Link>
                    <p>Bagageiros de Carga são o complemento perfeito para qualquer veículo off-road. Guarde a seus equipamentos sujos, pneu sobressalente, pá e muito mais. Encontre o melhor tamanho e estilo de bagageiro de carga que se adequada a sua rotina.</p>
                </article>
                <article>
                    <Link to='/locatario/bagageiro mala'>
                        <div className="image fit">
                            <img src="https://s3.us-east-2.amazonaws.com/evolumbreapp/d1.jpg" />
                        </div>
                        <h2>Bagageiros de Mala</h2>
                    </Link>
                    <p>Os bagageiros de mala são suportes de armazenamento resistentes a água e selados que são anexadas ao seu rack de fábrica ou sistema de base. Embora não seja tão robusto e versátil como bagageiro de carga, esses acessórios oferecem o espaço necessário para todos os seus equipamentos.</p>
                </article>
            </div>
        </div>
    </section>
);

export default ProductMain;