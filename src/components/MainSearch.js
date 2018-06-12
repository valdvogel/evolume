import React, { Component } from 'react';
import { history } from '../routes/AppRouter'
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';


class MainSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            error: ''
        }
    };
    onSearch = (e) => {
        const search = e;
        this.setState(() => ({ search }))
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.search == '')
            return false;
        else {
            history.push(`/locatario/equipamento/${this.state.search.toLowerCase()}`);
        }

    };
    render() {
        const data = [
            {
                label: "Suportes Para Bicicletas",
                value: "Bike"
            },
            {
                label: "Racks Para Teto",
                value: "Rack"
            },
            {
                label: "Bagageiros",
                value: "Bagageiros"
            },
            {
                label: "Suportes Para Equipamentos de Esportes Aquáticos",
                value: "Esportes Aquaticos"
            },
            {
                label: "Malas Para Bicicletas",
                value: "Malas Para Bicicletas"
            }
        ];
        return (
            <div>
                <section id="banner">
                    <h1>O QUE VOCÊ PROCURA?</h1>
                    <form onSubmit={this.onSubmitForm}>

                        <div className="busca0">
                            <div className="busca1">
                                <ReactiveBase
                                    app={process.env.ELK_APP}
                                    credentials={process.env.ELK_CREDENTIALS}
                                    type={process.env.ELK_TYPE}
                                >
                                    <DataSearch
                                        componentId="search"
                                        dataField="category"
                                        style={{ "paddingBottom": "350px" }}
                                        onValueChange={this.onSearch}
                                        defaultSuggestions={data}
                                        //icon= "../images/favicon.png"
                                        placeholder="Ex.: Suporte para bicicletas"
                                        iconPosition="left"
                                    />
                                </ReactiveBase>
                            </div>
                            <div className="busca2">
                                <input type="submit" value="Buscar" className="fit" />
                            </div>
                        </div>
                    </form>
                </section>

            </div>

        )
    }
}

export default MainSearch;

