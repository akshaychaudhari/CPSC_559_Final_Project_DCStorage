## `Decentralized File Storage - DCStorage DAPP`

## 🔧 Project Diagram:

![Project Diagram](https://i.gyazo.com/2738ea6743a40036756b1b5714ab9fa8.png)

## Features

1. **Secure Decentralized Storage:** Store any type of file with complete confidence. DataDen leverages decentralized storage to ensure the integrity and constant availability of your data, eliminating single points of failure.

2. **Secure and Transparent File Transfers:** Seamlessly send files directly between accounts using blockchain technology. This ensures secure and transparent transactions, giving you complete control over your data.

3. **Easy File Access - Anytime, Anywhere:** Download your uploaded files with ease. DataDen grants you convenient access to your data from any device, whenever you need it.

4. **Automatic File Expiration for Privacy and Efficiency:** Maintain control over your data privacy and storage usage. Set expiration dates for uploaded files, allowing for automatic deletion after a specified timeframe.

5. **Manage Your Data with Granular Control:** Take complete ownership of your data. DataDen empowers you to remove files from the app whenever needed, providing the flexibility to manage your data effectively.

6. **Effortless File Organization:** Organize your data for easy retrieval. Rename files after uploading them to the blockchain, ensuring clear identification and efficient management of your stored information.

7. **Intuitive and User-Friendly Interface:** Enjoy a visually appealing and intuitive user experience. DataDen's improved interface makes interacting with your data a breeze, maximizing usability and user satisfaction.

8. **Rigorously Tested on Blockchain Test Network:** Experience a thoroughly tested and validated system. The DataDen contract has been successfully deployed on testnets, specifically Sepolia, ensuring the platform functions flawlessly.

9. **Enriched File Uploads with Flexible Renaming and Information:** Organize and describe your data effortlessly. Rename uploaded files and provide relevant information directly on the blockchain, facilitating clear identification and efficient data management.

# Requirments:

- Metamask account
- Ganache
- Node.js
- web3.js
- truffle
- Infura
- IPFS

## Setting Up Enviorment:

- Insatlling Metamask wallet either via using chromium extentions
- Installing Node.js
- Installing ganache

## 1. Clone/download the repos

## 2. Configure the project

      npm install
      npm run start

## 3. Metamask Connection

      Use account private key and import it to metamask.
      For the "Network Name" field enter "localhost".
      For the "New RPC URL" field enter "http://127.0.0.1:7545".
      For the chain ID enter "1337". Then click save.

## Comammnds to run on Sepolia testnet

    To compile the contracts :  npx hardhat compile
    To deploy the contracts  :  npx hardhat run deployments/deploy.js --network sepolia

## References

https://github.com/ethereumbook/ethereumbook/blob/develop/12dapps.asciidoc
https://github.com/ethereumbook/ethereumbook/tree/develop/code/auction_dapp
