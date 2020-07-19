import React from 'react'

function Dropdown(title, options) {
    return (
        <div>
            <select name={title} id={title}>
                {options.map(
                    item => <option value={item.toLowercase()}>{item}</option>
                )}
            </select>
        </div>
    )
}

export default Dropdown
