import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';

const $ = require('jquery');

class Favorite extends Component {

    constructor(props) {
        super(props);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        const isFav = props.headline.isFavorite === 'true' || props.headline.isFavorite === true;
        this.state = {isFavorite: isFav};
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.headline.isFavorite !== this.state.isFavorite;
    }

    componentWillUpdate() {
        const propsIsFavorite = this.props.headline.isFavorite;
        const isFavorite = propsIsFavorite === 'true' || propsIsFavorite === true;
        if (this.state.isFavorite !== isFavorite) {
            this.setState({
                'isFavorite': isFavorite
            });
        }
    }

    toggleFavorite() {
        const isNewFavorite = !this.state.isFavorite;
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
                success: function () {
                    that.setState({isFavorite: !that.state.isFavorite})
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
                success: function () {
                    that.setState({isFavorite: !that.state.isFavorite})
                }
            });
        }

    }

    render() {
        let that = this;
        if (this.state && this.state.isFavorite === true) {
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