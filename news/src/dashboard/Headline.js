import React, {Component} from 'react';
import 'bootstrap';
class Headline extends Component {

    render() {
        let that = this;
        return (
            <div class="mx-auto p-1 w-50 rounded">
                <a href={that.props.url}>
                    <div className="Headline" class="media border">
                        <div class="p-2 mw-25 mh-25">
                            <img class="img-thumbnail" width="64" height="64" src={that.props.image}/>
                        </div>
                        <div class="media-body">
                            <h6 class="mt-0">{that.props.title}</h6>
                            <small class="text-muted">{that.props.description}</small>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}


export default Headline;