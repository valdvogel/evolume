import React from 'react';
import { ReactiveBase, DataSearch, RangeSlider, ResultCard } from '@appbaseio/reactivesearch';



class LocatarioPage extends React.Component {
    componentDidMount = () => {

    };
    
    constructor(props) {
        super(props);
        
        const param = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1);
        const value = param == 'locatario' ? '' : param;
        this.state = {
            search: value,
            error: ''
        }
    };

    render() {
        return (
            <div className="container">
                <ReactiveBase
                    app={process.env.ELK_APP}
                    credentials={process.env.ELK_CREDENTIALS}
                    type={process.env.ELK_TYPE}
                >
                    <div className="left-col">
                        <DataSearch
                            componentId="SearchSensor"
                            dataField="category"
                            title="Equipamento :"
                            autosuggest={false}
                            placeholder="Equipamento"
                            iconPosition="left"
                            className="search"
                            highlight={true}
                            defaultSelected={this.state.search}
                        />
                        <RangeSlider
                            componentId="PriceSensor"
                            dataField="price"
                            title="Valores :"
                            range={{
                                start: 10,
                                end: 250,
                            }}
                            rangeLabels={{
                                start: 'R$10',
                                end: 'R$250',
                            }}
                            defaultSelected={{
                                start: 10,
                                end: 150,
                            }}
                            stepValue={10}
                            interval={20}
                            react={{
                                and: ['DateRangeSensor'],
                            }}
                        />
                    </div>

                    <ResultCard
                        className="right-col"
                        componentId="SearchResult"
                        dataField="category"
                        onNoResults="Nenhum resultado encontrado!"
                        size={12}
                        onData={data => ({
                            image: data.image,
                            title: data.category,
                            description: (
                                <div>
                                    <div className="price">R$ {data.price}</div>
                                    <p className="info">Contato : {data.contact}</p>
                                    <p className="info">Estrela : {data.rate} estrelas</p>
                                </div>
                            ),
                            url: '/produto/' + data._id
                        })}
                        target="_self"
                        pagination
                        react={{
                            and: ['SearchSensor', 'GuestSensor', 'PriceSensor', 'DateRangeSensor', 'search'],
                        }}
                        innerClass={{
                            resultStats: 'result-stats',
                            list: 'list',
                            listItem: 'list-item',
                            image: 'image',
                        }}
                    />
                </ReactiveBase>
                

            </div>

        )

    }
}

export default LocatarioPage;
