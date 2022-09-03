import React, {Component} from "react";
import GoogleMap from "./google_map";

class CollegeSearch extends Component {
    state = {
        query: '',
        page: 0,
        per_page: 10,
        total: 0,
        schools: [],
        google_maps_query: "44.967243,-103.771556"
    };

    search = () => {
        searchSchools(this.state.query, this.state.page, this.state.per_page)
            .then(response => {
                    this.setState({schools: response.schools, total: response.total})
                }
            )
    }

    renderSchools() {
        if (this.state.schools.length === 0) return <p>No Results</p>;
        return <ul className="list-group">
            {this.state.schools.map(
                school =>
                    <li key={school.id}
                        className="list-group-item"
                        onClick={event => {
                            this.setState({google_maps_query: `${school.location.lat},${school.location.lon}`})
                        }}
                    >
                        {school.name}
                    </li>
            )}
        </ul>
    }

    renderPagination() {
        if (this.state.schools.length === 0 || Math.ceil(this.state.total / this.state.per_page) === 1) return "";
        return <ul className="pagination">
            {Array(Math.ceil(this.state.total / this.state.per_page)).fill(0).map(
                (_, i) =>
                    <li key={i}
                        className="page-item"
                        onClick={event => {
                            this.setState({page: i}, this.search)
                        }}><a className="page-link">{i + 1}</a>
                    </li>
            )}
        </ul>
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h1>College Search</h1>
                        <input onChange={event => this.setState({query: event.target.value})}
                               onKeyDown={event => {
                                   if (event.key === 'Enter') {
                                       this.setState({page: 0}, this.search)
                                   }
                               }}
                        ></input>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.renderSchools()}
                            {this.renderPagination()}
                        </div>
                        <div className="col">
                            <GoogleMap google_maps_query={this.state.google_maps_query}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export async function searchSchools(query, page, per_page) {
    const api_host = process.env.REACT_APP_COLLEGE_SEARCH_API_HOST
    const response = await fetch(`${api_host}/schools?query=${query}&page=${page}&per_page=${per_page}`);
    return await response.json();
}

export default CollegeSearch;
