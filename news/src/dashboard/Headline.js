import React, {Component} from 'react';
import Favorite from './Favorite';

class Headline extends Component {

    render() {
        let that = this;
        return (
            <div className="mx-auto p-1 w-50 rounded">
                <div className="headline media border">
                    <a href={that.props.url}>
                        <div className="media-body py-2 px-3 my-auto float-left">
                            <img className="img-thumbnail" width="64" height="64" src={that.props.image}/>
                        </div>
                        <div className="media-body mx-auto py-1">
                            <h6 className="mt-0">{that.props.title}</h6>
                            <small className="text-muted">{that.props.description}</small>
                        </div>
                    </a>
                    <div className="media-body my-auto pr-2">
                        <Favorite headline={that.props} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Headline;