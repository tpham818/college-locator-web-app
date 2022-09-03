import React, {Component} from "react";

class GoogleMap extends Component {

    render() {
        const api_key = process.env.REACT_APP_GOOGLE_API_KEY
        const iframe_source = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${this.props.google_maps_query}`
        return (
            <iframe
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={iframe_source}>
            </iframe>
        )
    }
}

export default GoogleMap;
