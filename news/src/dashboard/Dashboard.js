import React, {Component} from 'react';
import Headline from './Headline';

const $ = require('jquery');
const npr = "https://www.npr.org/rss/rss.php";
// const ap = "";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.createHeadline = this.createHeadline.bind(this);
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
                console.log(response);
                if (response) {
                    let items = Array.from(response.querySelectorAll('item'));
                    let image = response.querySelector('image').querySelector('url').textContent;
                    console.log(items);
                    console.log(image);
                    that.setState({data: items, image: image});
                }
            });
    }

    createHeadline(headline) {
        return <Headline url={headline.querySelector('link').textContent}
                         image={this.state.image}
                         title={headline.querySelector('title').textContent}
                         description={headline.querySelector('description').textContent}
        />
    }

    render() {
        let that = this;
        if (that.state) {
            return (
                <div class="container-fluid">
                    <div className="Dashboard" class="panel panel-default">
                        <div class="panel-body">
                            {that.state.data.map(this.createHeadline)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Dashboard" class="container-fluid">
                </div>
            );
        }

    }
};

export default Dashboard;