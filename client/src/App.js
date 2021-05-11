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
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = GreatToken.networks[networkId];
      const deployedNetworkSale = GreatTokenSale.networks[networkId];
      console.log('deployedNetworkSale', deployedNetworkSale);

      // get Instance of GreatToken contract
      const tokenContract = new web3.eth.Contract(
        GreatToken.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // get Instance of GreatTokenSale contract
      const tokenSaleContract = new web3.eth.Contract(
        GreatTokenSale.abi,
        deployedNetworkSale && deployedNetworkSale.address,
      );
      console.log('tokenSaleContract', tokenSaleContract);

      const account = await web3.eth.getCoinbase();

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
    console.log('balance', balance);

    this.setState({
      tokenPriceInWei: price,
      tokenPriceInEth: Web3.utils.fromWei(price),
      tokensSold,
      balance,
    });
  };

  buyTokens = async (tokensNumber) => {
    const { tokenSaleContract, account, tokenPriceInWei } = this.state;
    // return await tokenSaleContract.methods.buyTokens(tokensNumber).send({
    //   from: account,
    //   value: tokensNumber * tokenPriceInWei,
    //   gas: 50000,
    // });
  };

  initData = async () => {
    this.getToeknInformation();

    // const { accounts, tokenContract, tokenSaleContract } = this.state;

    // const address = await tokenContract.methods.name().call();
    // const tokenPrice = await tokenSaleContract.methods.tokenPrice().call();
  };

  render() {
    const { account, web3, tokenPriceInEth, tokensSold, tokensAvailable, balance } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <Header tokenPrice={tokenPriceInEth} balance={balance} />
        <FormSection buyTokens={this.buyTokens} />
        <ProgressBar tokensSold={tokensSold} tokensAvailable={tokensAvailable} />
        <WarningSection />
        <Typography align="center">Your Address: {account}</Typography>
      </div>
    );
  }
}

export default App;
