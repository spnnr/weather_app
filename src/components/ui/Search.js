import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
        this.textInput = React.createRef();
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    onSearchSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    componentDidMount() {
        this.focusTextInput();
    }

    render() {
        return (
            <form
                className="form-inline my-2 my-lg-0"
                onSubmit={this.onSearchSubmit}
            >
                <input
                    ref={this.textInput}
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={e => this.setState({ term: e.target.value })}
                    className="form-control mr-sm-2"
                />
                <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                >
                    Search
                </button>
            </form>
        );
    }
}

export default Search;
