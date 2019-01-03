import React from "react";

class SearchBar extends React.Component {
    state = { term: "" };

    onSearchSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <form onSubmit={this.onSearchSubmit}>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={e => this.setState({ term: e.target.value })}
                    className="form-control"
                />
            </form>
        );
    }
}

export default SearchBar;
