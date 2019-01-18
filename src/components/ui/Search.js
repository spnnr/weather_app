import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
        this.textInput = React.createRef();
    }

    onSearchSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
        this.textInput.current.value = "";
    };

    componentDidMount() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <form
                className="form-inline my-2 my-lg-0 d-flex flex-nowrap"
                onSubmit={this.onSearchSubmit}
            >
                <input
                    ref={this.textInput}
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={e => this.setState({ term: e.target.value })}
                    className="form-control form-control-sm mr-sm-2"
                />
                <button
                    className="btn btn-sm btn-outline-success my-2 my-sm-0"
                    type="submit"
                >
                    Search
                </button>
            </form>
        );
    }
}

export default Search;
