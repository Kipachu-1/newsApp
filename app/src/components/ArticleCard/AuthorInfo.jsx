import React from 'react'

const AuthorInfo = ({author_data}) => {
  return (
    <div className='card-author-info'>
        <div className='author-main'>
            <div className='card-author-avatar'>
                <img src="" alt="" />
            </div>
            <div className='card-main-block'>
                <p>Published by</p>
                <p className='card-author-name'>
                    {author_data.name}
                </p>
            </div>
            </div>
        <div>
        <div className='card-follow-btn'>
            <p>Follow</p>
        </div>
        </div>
    </div>
  )
}

export default AuthorInfo