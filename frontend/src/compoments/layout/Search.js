import React, { useState } from 'react'

export default function Search(props) {

    const [keyword, setKeyword] = useState("");
    
    const onSubmitFormSearchHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            props.history.push(`/search/${keyword}`);
        } else {
            props.history.push('/')
        }
    }

    return (
        
            <form onSubmit = { onSubmitFormSearchHandler } >
                <div className="input-group">
                    <input 
                        type="text"
                        className="form-control"
                        id="search_field"
                        placeholder="Enter product name ..."
                        onChange={ (e) => setKeyword(e.target.value) }

                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-secondary"
                            type="submit"
                            id="search_btn"
                        >
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </form>
    )
}
