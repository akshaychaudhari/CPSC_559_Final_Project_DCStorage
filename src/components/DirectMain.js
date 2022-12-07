import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';

class DirectMain extends Component {

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <h1 style={{color: "#5c13ec", fontFamily: "copperplate"}}>CRYPTO BOX DIRECT</h1>
              <div className="card mb-3 mx-auto" style={{ maxWidth: '512px', fontFamily: "cursive", backgroundColor: "black" }}>
                <h2 className='pt-4' style={{color: "#7c42ef"}}><b>Direct Share</b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    const recieverAddress = this.recieverAddress.value
                    const oneTimeLink = this.oneTimeLink
                    this.props.uploadFile(description, recieverAddress, oneTimeLink)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control"
                            placeholder="description..."
                            required />
                      </div>
                      <div className="form-group">
                        <br></br>
                          <input
                            id="recieverAddress"
                            type="text"
                            ref={(input) => { this.recieverAddress = input }}
                            className="form-control"
                            placeholder="Reciever's Address..."
                            required />
                      </div>
                      <div class="form-check mt-4 mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="oneTimeLink" onChange={e => {this.oneTimeLink = e.target.checked}} />
                        <label class="form-check-label text-white" for="oneTimeLink">
                          One Time Link
                        </label>
                      </div>
                    <input type="file" onChange={this.props.captureFile} className="text-white pb-3"/>
                    <button type="submit" className="btn btn-block text-white" style={{backgroundColor: "#7c42ef"}}><b>Upload!</b></button>
                  </form>
              </div>
              <p>&nbsp;</p>
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr style={{backgroundColor: "#5c13ec", color: "white"}}>
                    <th scope="col" style={{ width: '10px'}}>ID</th>
                    <th scope="col" style={{ width: '200px'}}>Name</th>
                    <th scope="col" style={{ width: '230px'}}>Description</th>
                    <th scope="col" style={{ width: '120px'}}>Type</th>
                    <th scope="col" style={{ width: '90px'}}>Size</th>
                    <th scope="col" style={{ width: '90px'}}>Datetime</th>
                    <th scope="col" style={{ width: '120px'}}>Uploader</th>
                    <th scope="col" style={{ width: '120px'}}>View File</th>
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <a
                            onClick={() => this.props.triggerHandleOneTimeLink(file)}
                            href={"https://w3s.link/ipfs/" + file.fileHash + "/" + file.fileName}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr style={{backgroundColor: "#5c13ec", color: "white"}}>
                    <th scope="col" style={{ width: '10px'}}>ID</th>
                    <th scope="col" style={{ width: '200px'}}>Name</th>
                    <th scope="col" style={{ width: '230px'}}>Description</th>
                    <th scope="col" style={{ width: '120px'}}>Type</th>
                    <th scope="col" style={{ width: '90px'}}>Size</th>
                    <th scope="col" style={{ width: '90px'}}>Datetime</th>
                    <th scope="col" style={{ width: '120px'}}>Reciever</th>
                    <th scope="col" style={{ width: '120px'}}>View File</th>
                  </tr>
                </thead>
                { this.props.uploaderFiles.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <a
                            onClick={() => this.props.triggerHandleOneTimeLink(file)}
                            href={"https://w3s.link/ipfs/" + file.fileHash + "/" + file.fileName}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default DirectMain;