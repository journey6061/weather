import React from 'react';


const post = (props) => (
    <article >
        <h1>{props.title}</h1>
        <div >
            <div >{props.author}</div>
        </div>
    </article>
);

export default post;