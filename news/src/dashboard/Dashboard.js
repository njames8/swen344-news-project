import React, {Component} from 'react';
import Headline from './Headline';
import apLogo from '../ap.svg';

const $ = require('jquery');
const npr = "https://www.npr.org/rss/rss.php";
const ap = "http://hosted.ap.org/lineups/POLITICSHEADS.rss?SITE=PAREA&SECTION=HOME";
const espn = "http://www.espn.com/espn/rss/news";
const weather = "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=1&locCode=14623";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.createHeadline = this.createHeadline.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.createHeadlinesForSource = this.createHeadlinesForSource.bind(this);
    }

    componentWillMount() {
        const that = this;
        $.ajax(npr, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: 'xml'
        })
            .done(function (response) {
                if (response) {
                    let items = Array.from(response.querySelectorAll('item'));
                    let image = response.querySelector('image').querySelector('url').textContent;
                    that.setState({npr: {items: items, image: image}});
                }
            });
        $.ajax(ap, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: 'xml'
        })
            .done(function (response) {
                console.log(response);
                if (response) {
                    let items = Array.from(response.querySelectorAll('item'));
                    that.setState({ap: {items: items, image: apLogo}});
                }
            });

        $.ajax(espn, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: 'xml'
        })
            .done(function (response) {
                if (response) {
                    let items = Array.from(response.querySelectorAll('item'));
                    let image = response.querySelector('image').querySelector('url').textContent;
                    that.setState({espn: {items: items, image: image}});
                }
            });

        $.ajax(weather, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: 'xml'
        })
            .done(function (response) {
                if (response) {
                    let items = Array.from(response.querySelectorAll('item'));
                    let image = response.querySelector('image').querySelector('url').textContent;
                    that.setState({weather: {items: items, image: image}});
                }
            });

    }

    createHeadlinesForSource(headlines) {
        const that = this;
        if (headlines) {
            const image = headlines.image;
            return headlines.items.map(function (h) {
                return that.createHeadline(h, image);
            })
        }
    }

    createHeadline(headline, image) {
        return <Headline url={headline.querySelector('link').textContent}
                         image={image}
                         title={headline.querySelector('title').textContent}
                         description={headline.querySelector('description').textContent.replace(/<img[^>]*>/g,"")}
        />
    }

    getAllData() {
        let data = [];

        data.push(this.state.npr);
        data.push(this.state.ap);
        data.push(this.state.espn);
        data.push(this.state.weather);


        return data;
    }

    render() {
        let that = this;
        if (that.state) {
            const data = this.getAllData();
            if (data.length > 0) {
                return (
                    <div className="Dashboard" class="panel panel-default">
                        <div class="panel-body">
                            {data.map(that.createHeadlinesForSource)}
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="Dashboard" class="container-fluid">
            </div>
        );
    }
}

export default Dashboard;