// noinspection BadExpressionStatementJS

import React from 'react'
import {Modal} from "react-bootstrap";
import {useWeb3React} from "@web3-react/core";
import styled from 'styled-components'

import { NetworkButton } from "../Buttons";
import {switchNetworkToBSC, SwitchNetworkToBSC, switchNetworkToBSCTestNet} from "../../utils/wallet"

const NetworkImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  margin-right: 24px;
`
const NetworkSelectModal = ({show, onHide}) => {
    const { chainId } = useWeb3React()

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Network Switch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {chainId === 1337 ?
                        `You are currently on the Localhost`
                        : chainId === 97 ?
                        `You are currently on the BSC Testnet`
                        : chainId === 56 ?
                        `You are currently on the BSC Mainnet`: ''
                    }
                    <NetworkButton onClick={async () => {
                        await switchNetworkToBSC()
                    }}>
                        <NetworkImage
                            src="https://raw.githubusercontent.com/firebird-finance/firebird-assets/master/blockchains/binance/info/logo.png"
                            alt="" />
                        <div className="me-2">Binance Smart Chain</div>
                    </NetworkButton>
                    <NetworkButton onClick={async () => {
                        await switchNetworkToBSCTestNet()
                    }}>
                        <NetworkImage
                            src="https://raw.githubusercontent.com/firebird-finance/firebird-assets/master/blockchains/binance/info/logo.png"
                            alt="" />
                        <div className="me-2">Binance Smart Chain (Testnet)</div>
                    </NetworkButton>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default NetworkSelectModal