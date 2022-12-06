import OrganizationUploads from '../abis/OrganizationUploads.json';
import { Web3Storage } from "web3.storage";
import React, { Component } from 'react';
import Navbar from './Navbar';
import DirectMain from './DirectMain';
import Web3 from 'web3';
import './Direct.css';

const client = new Web3Storage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzQ2JjQjMzMmEwQTViQTgzMzk0Q2ViMkZDN0Q0MjI3ZWFEZEVBODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5ODkyODU4NzgsIm5hbWUiOiJEQ1N0b3JhZ2UifQ.zHvbO3DBPsPmknHnKcT0ummPGKROWtXsqYVOs19Suz0"});

class Direct extends Component {

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
    const networkData = OrganizationUploads.networks[networkId]
    if(networkData) {
      const organizationuploads = new web3.eth.Contract(OrganizationUploads.abi, networkData.address)
      this.setState({ organizationuploads })
      const currentRecieverFileIds = await organizationuploads.methods.currentUserFileIds().call({from: this.state.account})
      this.setState({ currentRecieverFileIds })
      for (var i = currentRecieverFileIds.length - 1; i >= 0; i--) {
        const file = await organizationuploads.methods.directfiles(currentRecieverFileIds[i]).call()
        console.log(file)
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('Error! The OrganizationUploads contract not deployed on the detected network!');
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

  uploadFile = async (description, recieverAddress, oneTimeLink) => {
    // console.log("Submitting file to IPFS...")
    const rootCid = await client.put([this.state.rawFile]);
    const info = await client.status(rootCid);
    console.log(info)
    console.log(rootCid);
      this.setState({ loading: true })
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.organizationuploads.methods.uploadDirectFile(rootCid, this.state.size, this.state.type, this.state.name, description, recieverAddress, oneTimeLink).send({ from: this.state.account }).on('transactionHash', (hash) => {
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
      organizationuploads: null,
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
          : <DirectMain
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default Direct;