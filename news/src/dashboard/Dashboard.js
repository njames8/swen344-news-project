import React, {Component} from 'react';
import Headline from './Headline';
import rss from './ajax.js';

const $ = require('jquery');

const espn1 = "http://www.espn.com/espn/rss/mlb/news";
const espn2 = "http://www.espn.com/espn/rss/rpm/news";
const espn3 = "http://www.espn.com/espn/rss/ncb/news";
const espn4 = "http://www.espn.com/espn/rss/nhl/news";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.createHeadline = this.createHeadline.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.setData = this.setData.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.state = {
            showEspn1: true,
            showEspn2: true,
            showEspn3: true,
            showEspn4: true,
            favorites: null
        }
    }

    componentDidMount() {
        let showOne = localStorage.getItem('espn1') === 'true';
        let showTwo = localStorage.getItem('espn2') === 'true';
        let showThree = localStorage.getItem('espn3') === 'true';
        let showFour = localStorage.getItem('espn4') === 'true';

        if (showOne) rss(this.setData, espn1, 'espn1');
        if (showTwo) rss(this.setData, espn2, 'espn2');
        if (showThree) rss(this.setData, espn3, 'espn3');
        if (showFour) rss(this.setData, espn4, 'espn4');

        this.setState({
            showEspn1: showOne,
            showEspn2: showTwo,
            showEspn3: showThree,
            showEspn4: showFour
        });

        const that = this;
        $.ajax({
            url: "favorites.json",
            dataType: 'json',
            success: function (response) {
                that.setState({
                    favorites: response
                });
            },
            error: function () {
                console.log("Could not update favorites");
            }
        })


    }

    componentDidUpdate() {
        this.getAllData();
    }

    createHeadline(headline) {
        return <Headline url={headline.url}
                         image={headline.image}
                         title={headline.title}
                         description={headline.description}
                         isFavorite={headline.isFavorite}
                         pubDate={headline.pubDate}
        />
    }

    toggleCheckbox() {
        let showEspn1 = $('#espn1').is(":checked");
        let showEspn2 = $('#espn2').is(":checked");
        let showEspn3 = $('#espn3').is(":checked");
        let showEspn4 = $('#espn4').is(":checked");

        let espn1Data = this.state.espn1;
        let espn2Data = this.state.espn2;
        let espn3Data = this.state.espn3;
        let espn4Data = this.state.espn4;

        let espn1Val = showEspn1 ? (espn1Data ? espn1Data : rss(this.setData, espn1, 'espn1')) : null;
        let espn2Val = showEspn2 ? (espn2Data ? espn2Data : rss(this.setData, espn2, 'espn2')) : null;
        let espn3Val = showEspn3 ? (espn3Data ? espn3Data : rss(this.setData, espn3, 'espn3')) : null;
        let espn4Val = showEspn4 ? (espn4Data ? espn4Data : rss(this.setData, espn4, 'espn4')) : null;

        this.setState({
            espn1: espn1Val,
            espn2: espn2Val,
            espn3: espn3Val,
            espn4: espn4Val,
            showEspn1: showEspn1,
            showEspn2: showEspn2,
            showEspn3: showEspn3,
            showEspn4: showEspn4
        });

        localStorage.setItem('espn1', showEspn1);
        localStorage.setItem('espn2', showEspn2);
        localStorage.setItem('espn3', showEspn3);
        localStorage.setItem('espn4', showEspn4);
    }

    setData(str, obj) {
        let stateObj = {};
        stateObj[str] = obj;
        this.setState(stateObj);
    }

    getAllData() {
        let data = [];
        if (this.state.espn1) {
            data = data.concat(this.state.espn1);
        }
        if (this.state.espn2) {
            data = data.concat(this.state.espn2);
        }
        if (this.state.espn3) {
            data = data.concat(this.state.espn3);
        }
        if (this.state.espn4) {
            data = data.concat(this.state.espn4);
        }

        const favorites = this.state.favorites;
        if (favorites) {
            let toPush = [];
            favorites.forEach(function (f) {
                const index = data.findIndex(i => i.title === f.title && i.description === f.description && i.url === f.url && i.pubDate === f.pubDate);
                if (index === -1) {
                    toPush.push(f);
                } else {
                    data[index].isFavorite = true;
                }
            });
            data = data.concat(toPush);
        }

        data.sort(function (a, b) {
            let aPubDate = Date.parse(a.pubDate);
            let bPubDate = Date.parse(b.pubDate);
            if (aPubDate > bPubDate) {
                return 1;
            }
            if (aPubDate === bPubDate) {
                return 0;
            }
            return -1;
        });

        return data;
    }

    render() {
        let that = this;
        let headlines = [];
        if (that.state && (that.state.espn1 || that.state.espn2 || that.state.espn3 || that.state.espn4)) {
            const data = this.getAllData();
            if (data.length > 0) {
                headlines = data.map(function (d) {
                    return that.createHeadline(d);
                });
            }
        }
        return (
            <div className="dashboard panel panel-default">
                <form className="sticky-top">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item" >
                            <input id='espn1' type="checkbox" onClick={this.toggleCheckbox} checked={this.state.showEspn1}/>
                            <label>MLB</label>
                        </li>
                        <li className="breadcrumb-item" >
                            <input id='espn2' type="checkbox" onClick={this.toggleCheckbox} checked={this.state.showEspn2}/>
                            <label>Motorsports</label>
                        </li>
                        <li className="breadcrumb-item" >
                            <input id='espn3' type="checkbox" onClick={this.toggleCheckbox} checked={this.state.showEspn3}/>
                            <label>College Basketball</label>
                        </li>
                        <li className="breadcrumb-item" >
                            <input id='espn4' type="checkbox" onClick={this.toggleCheckbox} checked={this.state.showEspn4}/>
                            <label>NHL</label>
                        </li>
                    </ul>
                </form>
                <div className="panel-body">
                    {headlines}
                </div>
            </div>
        );
    }
}

export default Dashboard;