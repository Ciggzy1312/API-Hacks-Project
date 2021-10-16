import React from 'react'

const QueryPage = (query) => {
    console.log(query)
    return (
        <div>
            <h1>Query page...</h1>
            {query.query.map((log)=>(
                <h1>{log.title}</h1>
            ))}
        </div>
    )
}

export default QueryPage
