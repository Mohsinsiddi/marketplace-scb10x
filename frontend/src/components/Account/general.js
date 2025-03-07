import React, { useState, useEffect, useCallback, useContext } from "react"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import { TailSpin } from 'react-loader-spinner'
import { AccountContext } from "../../hooks/useAccount"
import "react-toastify/dist/ReactToastify.css"

const Wrapper = styled.div.attrs(() => ({
  className: "rounded-md",
}))`
  background: var(--secondary);
  min-height: 200px;
  margin-top: 1rem;
  padding: 20px;

  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  hr {
    background: white;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .error-message {
    margin-left: 10px;
    font-size: 14px;
    color: var(--danger);
  }
`

const EmailInput = styled.input.attrs(() => ({
  type: "text",
  placeholder: "E-mail Address",
}))`
  background: transparent;
  border: 1px solid #fff;
  padding: 12px;
  border-radius: 32px;
  font-size: 16px;
  color: #fff;
  width: 100%;
  margin-top: 12px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`

const NameInput = styled.input.attrs(() => ({
  type: "text",
  placeholder: "Display Name",
}))`
  background: transparent;
  border: 1px solid #fff;
  padding: 12px;
  border-radius: 32px;
  font-size: 16px;
  color: #fff;
  width: 100%;
  margin: 12px 0;

  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`

const General = () => {
  const [email, setEmail] = useState()
  const [displayName, setDisplayName] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState()
  const accountContext = useContext(AccountContext)

  useEffect(() => {
    if (accountContext) {
      setDisplayName(accountContext.nickname)
      setEmail(accountContext.email)
    }
  }, [accountContext])

  const onSave = useCallback(async () => {
    setErrorMessage()
    if (email) {
      if (
        email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setLoading(true)
        
        try {
          await accountContext.updateAccount({
            email,
            nickName: displayName
          })
        } catch (e) {
          console.log(e)
        }

        setLoading(false)
      } else {
        setErrorMessage("Email is not valid")
      }
    }
  }, [email, displayName, accountContext])

  const disabled = !accountContext.email || loading

  return (
    <Wrapper>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <h4>Display Name</h4>
      <NameInput
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={disabled}
      />
      <h4>Email Address</h4>
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disabled}
      />
      {/* <p style={{ marginTop: "2rem" }}>
        Register your email address with us to receive notification when there
        are any updates to your orders
      </p> */}

      <hr />
      <a
        onClick={onSave}
        disabled={disabled}
        style={{
          zIndex: 10,
          color: "white",
          borderRadius: "32px",
          padding: "12px 24px",
          marginRight: "8px",
        }}
        className="btn btn-primary shadow"
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          {disabled && <span style={{ marginRight: "10px" }}><TailSpin color="#fff" height={24} width={24} /></span>}

          Save Changes
        </div>
      </a>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {!accountContext.email && <span className="ml-2">Checking...</span>}
    </Wrapper>
  )
}

export default General
