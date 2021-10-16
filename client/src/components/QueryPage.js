import React from 'react'
import './Query.css'
import { format } from 'timeago.js'
import { Star } from "@material-ui/icons";

const QueryPage = (query) => {
    console.log(query)
    return (
        <div className='query'>
            <div className='q-heading'>
                <h1>All Tales of {query?.query[0]?.title}</h1>
            </div>

            <div className='q-sub'>
                {query?.query?.map((p)=>(
                    <div className="q-card">
                        <label className='q-label'>Experience</label>
                        <p className="q-desc">{p.desc}</p>
                        <label className='q-label'>Rating</label>
                        <div className="q-stars">
                        {Array(parseInt(p.rating)).fill(<Star className="star" />)}
                        </div>
                        <h4 className="q-username">
                        Created by {p.username}
                        </h4>
                        <h5 className="q-date">{format(p.createdAt)}</h5>
                  </div>
                ))}

            </div>
        </div>
    )
}

export default QueryPage
