import { useWeb3React } from "@web3-react/core"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { Alert } from "../alert"
import { resolveNetworkName } from "../../helper"

const Content = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 600px;
  overflow: scroll;
  padding: 12px;
  min-height: 400px;
`

const Card = styled.div`
  background-color: rgba(38, 38, 38, 0.6);
  width: 260px;
  height: 344px;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  margin: 12px;
  opacity: ${(props) => (props.selected ? "0.64" : "100")};
  border: ${(props) =>
    props.selected ? "1px solid pink" : "1px solid transparent"};

  &:hover {
    border: 1px solid pink;
  }

  .name {
    color: #fff;
    margin-top: 12px;
  }
`

const shorterName = (name) => {
  return name.length > 28 ? `${name.slice(0, 15)}...${name.slice(-4)}` : name
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

const From = ({ nfts, fromData, setFromData, step, setStep }) => {

  const { chainId } = useWeb3React()

  return (
    <>

      {/* <Alert style={{ textAlign: "center", marginTop: "20px" }}>
        Select NFT from your wallet that you want to list and deposit
      </Alert> */}

      <Content>
        {nfts ? (
          nfts.map((nft, index) => (
            <Card
              key={index}
              selected={fromData && fromData.token_hash === nft.token_hash}
              onClick={() => setFromData(nft)}
            >
              <img src={nft.metadata.image} width="100%" height="220" />
              <div className="name">{(nft.name) || (nft.metadata.name)}{` `}#{shorterName(nft.token_id)}</div> 
              <div className="name">Chain: {resolveNetworkName(chainId)}</div>
            </Card>
          ))
        ) : (
          <>
            <Skeleton
              height="380px"
              width="260px"
              style={{ borderRadius: "12px", margin: "12px" }}
            />
            <Skeleton
              height="380px"
              width="260px"
              style={{ borderRadius: "12px", margin: "12px" }}
            />
            <Skeleton
              height="380px"
              width="260px"
              style={{ borderRadius: "12px", margin: "12px" }}
            />
            <Skeleton
              height="380px"
              width="260px"
              style={{ borderRadius: "12px", margin: "12px" }}
            />
          </>
        )}
      </Content>
      <ButtonContainer>
        {fromData && (
          <a
            style={{
              zIndex: 10,
              color: "white",
              borderRadius: "32px",
              padding: "12px 24px",
            }}
            className="btn btn-primary shadow"
            onClick={() => setStep(step + 1)}
          >
            Next
          </a>
        )}
      </ButtonContainer>
    </>
  )
}

export default From
