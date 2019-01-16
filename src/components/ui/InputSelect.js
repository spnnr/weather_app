import React from "react";

/*
props:
- [selectOptions]
- inputTitle
 */

const InputSelect = props => {
    let options = props.inputOptions.map((option, index) => {
        if (index === 0) {
            return (
                <option key={index} value={index} defaultValue>
                    {option}
                </option>
            );
        }
        return (
            <option key={index} value={index}>
                {option}
            </option>
        );
    });

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-prepend">
                <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                >
                    {props.inputTitle}
                </label>
            </div>
            <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={e => {
                    e.preventDefault();
                    props.onChange(
                        e.target.options[e.target.options.selectedIndex].text
                    );
                }}
            >
                {options}
            </select>
        </div>
    );
};

export default InputSelect;
