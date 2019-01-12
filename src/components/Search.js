import React from "react";

class Search extends React.Component {
    state = { term: "" };

    onSearchSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <form className="form-inline" onSubmit={this.onSearchSubmit}>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={e => this.setState({ term: e.target.value })}
                    className="form-control mr-sm-2"
                />
                <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    type="submit"
                >
                    Search
                </button>
            </form>
        );
    }
}

export default Search;
