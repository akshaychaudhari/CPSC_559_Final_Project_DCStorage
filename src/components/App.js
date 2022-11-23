import DCStorage from '../abis/DCStorage.json'
import { Web3Storage } from "web3.storage";
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

const client = new Web3Storage({token: ""});

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert("Please install Metamask in your browser to use the application!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const networkId = await web3.eth.net.getId()
    const networkData = DCStorage.networks[networkId]
    if(networkData) {
      const dcstorage = new web3.eth.Contract(DCStorage.abi, networkData.address)
      this.setState({ dcstorage })
      const filesCount = await dcstorage.methods.fileCount().call()
      this.setState({ filesCount })
      for (var i = filesCount; i >= 1; i--) {
        const file = await dcstorage.methods.files(i).call()
        console.log(file)
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('Error! The DCStorage contract not deployed on the detected network!');
    }
    this.setState({loading: false})
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        name: file.name,
        type: file.type,
        size: file.size,
        rawFile: file
      })
      console.log('buffer', this.state.rawFile)
    }
  }

  uploadFile = async description => {
    // console.log("Submitting file to IPFS...")
    const rootCid = await client.put([this.state.rawFile]);
    const info = await client.status(rootCid);
    console.log(info)
    console.log(rootCid);
      this.setState({ loading: true })
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.dcstorage.methods.uploadFile(rootCid, this.state.size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       window.location.reload()
      }).on('error', (e) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
    }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dcstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;