import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = ["https://data-seed-prebsc-1-s1.binance.org:8545", "https://data-seed-prebsc-2-s1.binance.org:8545"]

const getNodeUrl = () => {
    return nodes
}

export default getNodeUrl