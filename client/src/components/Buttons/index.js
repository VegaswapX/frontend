import React from 'react'
import styled from 'styled-components'

const NetworkButton = styled.button`
  background-color: floralwhite;
  outline: none;
  border: 1px solid rgb(73, 76, 83);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  margin: 12px 0;
  opacity: 1;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding: 12px 24px;
  width: 100% !important;
  &:hover {
    cursor: pointer;
    border: 1px solid rgb(231, 73, 37);
  }
`

export { NetworkButton }