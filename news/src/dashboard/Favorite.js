import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';

const $ = require('jquery');

class Favorite extends Component {

    constructor(props) {
        super(props);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    toggleFavorite() {
        const isNewFavorite = !this.props.headline.isFavorite;
        const that = this;
        if (isNewFavorite) {
            $.ajax({
                url: "favoriteAPI.php",
                type: 'POST',
                data: {
                    action: 'storeStuff',
                    title: this.props.headline.title,
                    description: this.props.headline.description,
                    url: this.props.headline.url,
                    image: this.props.headline.image,
                    pubDate: this.props.headline.pubDate,
                    isFavorite: true
                },
                error: function (xhr, status, error) {
                    console.log("xhr: " + xhr);
                    console.log("status: " + status);
                    console.log("error: " + error);
                },
                success: function (response) {
                    that.props.headline.setFavorites(JSON.parse(response));
                }
            });
        } else {
            $.ajax({
                url: "favoriteAPI.php",
                type: 'POST',
                data: {
                    action: 'removeStuff',
                    title: this.props.headline.title,
                    description: this.props.headline.description,
                    url: this.props.headline.url,
                    image: this.props.headline.image,
                    pubDate: this.props.headline.pubDate
                },
                error: function (xhr, status, error) {
                    console.log("xhr: " + xhr);
                    console.log("status: " + status);
                    console.log("error: " + error);
                },
                success: function (response) {
                    that.props.headline.setFavorites(JSON.parse(response));
                }
            });
        }

    }

    render() {
        let that = this;
        if (this.props.headline.isFavorite === true) {
            return (
                <span className='favorite fa fa-star fa-2x my-auto' aria-hidden="true" onClick={that.toggleFavorite}/>
            );
        }
        return (
            <span className='favorite fa fa-star-o fa-2x my-auto' aria-hidden="true" onClick={that.toggleFavorite}/>
        );
    }
}


export default Favorite;