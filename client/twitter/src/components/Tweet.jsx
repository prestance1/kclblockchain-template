import React from 'react'
import styled from 'styled-components'
const convertAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(38)
}


const Tweet = ({ tweet }) => {
  return (
    <TweetWrapper>
        <TweetHeader>
            <div className="profile-container" />
            <a href={`https://goerli.etherscan.io/address/${tweet[0]}`}>{convertAddress(tweet[0])}</a>
            <span /> 6h
        </TweetHeader>
        <div className="divider" />

        <TweetBody>{tweet[1]}</TweetBody>
        
    </TweetWrapper>
  )
}

const TweetWrapper = styled.div`
    font-family: sans-serif;
    background-color: white;
    border-radius: 15px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
    margin-top: 20px;
    padding: 32px;
    width: 300px;

    :hover {
        background-color: rgba(255,255,255,0.4);
        cursor: pointer;
    }
`
const TweetHeader = styled.div`
    display: flex;
    .profile-container {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #0152fe;
        margin-right: 16px;
    }
    a {
        color: rgba(0,0,0,0.3);
        text-decoration: none;
    }
    span {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: grey;
        margin: 0 8px;
    }

    align-items: center;
    font-weight: lighter;
    color: rgba(0,0,0,0.3);
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const TweetBody = styled.div`
    font-size: 16px;
    padding: 16px 0px;
`

export default Tweet