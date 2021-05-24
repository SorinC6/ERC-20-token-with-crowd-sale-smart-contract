import React, { Component } from 'react';
// import SimpleStorage from './contracts/SimpleStorage.json';
import GreatToken from './contracts/GreatToken.json';
import GreatTokenSale from './contracts/GreatTokenSale.json';
import getWeb3 from './getWeb3';
import Web3 from 'web3';

import Header from './components/Header';
import FormSection from './components/FormSection';
import ProgressBar from './components/ProgressBar';
import WarningSection from './components/WarningSection';
import { Typography } from '@material-ui/core';

class App extends Component {
  state = {
    web3: null,
    account: '0X0',
    contract: null,
    tokenContract: null,
    tokenSaleContract: null,
    tokenPriceInEth: 0,
    tokenPriceInWei: 0,
    tokensSold: 0,
    tokensAvailable: 800000,
    tokensToBeBuyed: null,
    loading: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      let tokenContract
      let tokenSaleContract
      let deployedNetwork
      let deployedNetworkSale

      deployedNetwork = GreatToken.networks[networkId];
      deployedNetworkSale = GreatTokenSale.networks[networkId];
      // get Instance of GreatToken contract
      tokenContract = new web3.eth.Contract(
        GreatToken.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // get Instance of GreatTokenSale contract
      tokenSaleContract = new web3.eth.Contract(
        GreatTokenSale.abi,
        deployedNetworkSale && deployedNetworkSale.address,
      );

      const account = await web3.eth.getCoinbase();

      await tokenSaleContract.events.Sell({ fromBlock: 0, toBlock: 'latest' }, async (error, event) => {
        this.setState({
          loading: false
        });
        this.setTokensToBeBuyed('')

        this.setState({ web3, accounts, tokenContract, tokenSaleContract, account }, this.initData);
      })

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, tokenContract, tokenSaleContract, account }, this.initData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };



  getToeknInformation = async () => {
    const { tokenSaleContract, tokenContract, account } = this.state;
    const price = await tokenSaleContract.methods.tokenPrice().call();
    const tokensSold = await tokenSaleContract.methods.tokenSold().call();
    const balance = await tokenContract.methods.balanceOf(account).call();

    this.setState({
      tokenPriceInWei: price,
      tokenPriceInEth: Web3.utils.fromWei(price),
      tokensSold,
      balance,
    });
  };

  setTokensToBeBuyed = (value) => {
    this.setState({ tokensToBeBuyed: value })
  }


  buyTokens = async (e) => {
    e.preventDefault();

    const { tokenSaleContract, account, tokenPriceInWei, tokensToBeBuyed } = this.state;
    this.setState({ loading: true })
    try {
      await tokenSaleContract.methods.buyTokens(tokensToBeBuyed).send({
        from: account,
        value: tokensToBeBuyed * tokenPriceInWei,
        gas: 500000,
      });
      this.forceUpdate()
    } catch (error) {
      this.setState({ loading: false })
    }
  };

  initData = async () => {
    this.getToeknInformation();
  };

  render() {
    const { account, web3, tokenPriceInEth, tokensSold, tokensAvailable, balance, tokensToBeBuyed } = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <Header tokenPrice={tokenPriceInEth} balance={balance} />
        <FormSection buyTokens={this.buyTokens} setTokensToBeBuyed={this.setTokensToBeBuyed} tokensToBeBuyed={tokensToBeBuyed} />
        <ProgressBar tokensSold={tokensSold} tokensAvailable={tokensAvailable} />
        <WarningSection />
        <Typography align="center">Your Address: {account}</Typography>
      </div>
    );
  }
}

export default App;
