import React, { Component } from 'react';
import ProcessMain from './ProcessMain';
import { ReactiveBase, DataSearch, NumberBox, DateRange, RangeSlider, ResultCard } from '@appbaseio/reactivesearch';
import moment from 'moment';




class LocadorPage extends React.Component {
    componentDidMount=()=>{
        
    };
    constructor(props) {
        super(props);
        const param = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/')+1);
        const value = param == 'locador'? '' : param;
        this.state = {
            search: value,
            error: ''
        }
    };
    render() {
        return (
            <div className="container">
                <ReactiveBase
                    app="evolumebr"
                    credentials="xYM80w0w7:bb421d67-1ea4-43de-b213-91c81bc24514"
                    type="equipment"
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
                            defaultSelected= {this.state.search}
                        />
                        <DateRange
                            dataField="date_from"
                            componentId="DateRangeSensor"
                            title="Quando :"
                            numberOfMonths={2}
                            queryFormat="basic_date"
                            initialMonth={new Date(moment().format('MM-DD-YYYY'))}
                            placeholder={{
                                start: 'Data Inicial',
                                end: 'Data Final'
                            }}
                            
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
                                start: 50,
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
                        size={12}
                        onData={data => ({
                            image: data.image,
                            title: data.category,
                            description: (
                                <div>
                                    <div className="price">R$ {data.price}</div>
                                    <p className="info">Contato : {data.contact}</p>
                                    <p className="info">Estrela : 5 estrelas</p>
                                </div>
                            ),
                            url: "/rent/123",
                        })}
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

export default LocadorPage;
