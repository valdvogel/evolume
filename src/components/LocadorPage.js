import React, { Component } from 'react';
import { ReactiveBase, DataSearch, NumberBox, DateRange, RangeSlider, ResultCard } from '@appbaseio/reactivesearch';

class LocadorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            error: ''
        }
        //console.log(props.match.params.value);
    };
    render() {
        return (
            <div className="container">
                <ReactiveBase
                    app="evolumebr"
                    credentials="xYM80w0w7:bb421d67-1ea4-43de-b213-91c81bc24514"
                    type="equipment"
                    theme={{
                        primaryColor: '#FF3A4E',
                    }}
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
                        />
                        <DateRange
                            dataField="date_from"
                            componentId="DateRangeSensor"
                            title="Quando :"
                            numberOfMonths={2}
                            queryFormat="basic_date"
                            initialMonth={new Date('04-01-2018')}
                        />
                        <RangeSlider
                            componentId="PriceSensor"
                            dataField="price"
                            title="Valores :"
                            range={{
                                start: 100,
                                end: 150,
                            }}
                            rangeLabels={{
                                start: '$100',
                                end: '$150',
                            }}
                            defaultSelected={{
                                start: 100,
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
                                    <div className="price">${data.price}</div>
                                    <p className="info">Contato : {data.contact}</p>
                                    <p className="info">Rating : 5 estrelas</p>
                                </div>
                            ),
                            url: data.url,
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
