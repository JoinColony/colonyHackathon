/*
Connector for Colony API
*/

// Import the prerequisites
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');

// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
const provider = new providers.JsonRpcProvider('http://localhost:8545/');

//Existing Colonies
let knownColoniesCache = [];

/**
 * Create a brand new Colony using its own ERC20 Token
 * @param {*} _accountNumber 
 * @param {*} _tokenName 
 * @param {*} _tokenSymbol 
 */
exports.createColony = async function (_accountNumber, _tokenName, _tokenSymbol) {
    console.log("createColony");

    // Get the private key from the selected account from the ganache-accounts
    // through trufflepig
    const { privateKey } = await loader.getAccount(_accountNumber);

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = new Wallet(privateKey, provider);

    // Create an adapter (powered by ethers)
    const adapter = new EthersAdapter({
        loader,
        provider,
        wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();

    // Let's deploy a new ERC20 token for our Colony.
    // You could also skip this step and use a pre-existing/deployed contract.
    const tokenAddress = await networkClient.createToken({
        name: _tokenName,
        symbol: _tokenSymbol,
    });
    console.log('Token address: ' + tokenAddress);

    // Create a cool Colony!
    const {
        eventData: { colonyId, colonyAddress },
    } = await networkClient.createColony.send({ tokenAddress });

    // Congrats, you've created a Colony!
    console.log('Colony ID: ' + colonyId);
    console.log('Colony address: ' + colonyAddress);

    // For a colony that exists already, you just need its ID:
    const colonyClient = await networkClient.getColonyClient(colonyId);

    const colonyData = await exports.gatherColonyData(colonyClient, colonyId);

    return {"colonyClient": colonyClient, "colonyData": colonyData};
};

exports.openColony = async function (_accountNumber, _colonyId, _colonyAddress) {
    console.log("openColony " +_accountNumber + ", " + _colonyId + ", " + _colonyAddress);

    // Get the private key from the selected account from the ganache-accounts
    // through trufflepig
    const { privateKey } = await loader.getAccount(_accountNumber);

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = new Wallet(privateKey, provider);

    // Create an adapter (powered by ethers)
    const adapter = new EthersAdapter({
        loader,
        provider,
        wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();

    console.log("openColony2 " +_accountNumber + ", " + _colonyId + ", " + _colonyAddress);

    // For a colony that exists already, you just need its ID:
    //const colonyClient = await networkClient.getColonyClient(_colonyId);
    const colonyClient = await networkClient.getColonyClientByAddress(_colonyAddress);

    console.log("openColony3 " +_accountNumber + ", " + _colonyId + ", " + _colonyAddress);
    const colonyData = await exports.gatherColonyData(colonyClient, _colonyId);

    console.log("openColony4 " +_accountNumber + ", " + _colonyId + ", " + _colonyAddress);
    return {"colonyClient": colonyClient, "colonyData": colonyData};
};

/**
 * List all known colonies
 * TODO: Process Colonies in parallel
 * @param {*} _accountNumber 
 */
exports.listColonies = async function (_accountNumber) {
    console.log("listColonies " + _accountNumber);
    const colonies = [];

    if (knownColoniesCache.length > 0) {
        console.log("reading from Cache with " + knownColoniesCache.length + " entries.");
        tempColonyList = [];

        for (colony in knownColoniesCache) {
            tempColonyList.push(knownColoniesCache[colony]);
        }
        return tempColonyList;
    }

    // Get the private key from the selected account from the ganache-accounts
    // through trufflepig
    const { privateKey } = await loader.getAccount(_accountNumber);

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = new Wallet(privateKey, provider);

    // Create an adapter (powered by ethers)
    const adapter = new EthersAdapter({
        loader,
        provider,
        wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();

    // You can also get the Meta Colony:
    //const metaColonyClient = await networkClient.getMetaColonyClient();
    //console.log('Meta Colony address: ' + metaColonyClient.contract.address);

    //List Colonies
    try {
        const colonyClientPromises = [];
        const totalColonyCount = (await networkClient.getColonyCount.call()).count;
        for (x = 1; x <= totalColonyCount; x++) {
            console.log("Extracting Colony Data " + x);
            const colonyClient = await networkClient.getColonyClient(x);

            colonyData = await exports.gatherColonyData(colonyClient, x);

            console.log(colonyData);

            colonies.push(colonyData);

            //break; //REMOVE
        }
    } catch (e) {
        console.log(e);
    }

    return colonies;
};

/**
 * Gathers simply and consistent represenation of the Colony
 * @param {*} _colonyClient
 */
exports.gatherColonyData = async function (_colonyClient, _id) {
    console.log("gatherColonyData " + _id);
    const colonyTokenInfo = await _colonyClient.token.getTokenInfo.call();
    const colonyDomainCount = (await _colonyClient.getDomainCount.call()).count;
    const colonyTaskCount = (await _colonyClient.getTaskCount.call()).count;
    const colonyContractAddress = _colonyClient.contract.address;
    const colonyId = _id;

    //Gather data
    const colonyData = {
        "token": colonyTokenInfo,
        "domainCount": colonyDomainCount,
        "taskCount": colonyDomainCount,
        "address": colonyContractAddress,
        "id": colonyId
    };

    return colonyData;
}

/**
 * List Existing Accounts
 */
exports.listAccounts = async function () {
    let addressList = [];
    // Get the addresses from all local accounts through trufflepig
    try {
        while (true) {
            const { address } = await loader.getAccount(addressList.length);

            addressList.push(address);
        }
    } catch (e) {
        console.log("Finished Loading Accounts. Found " + addressList.length + " accounts. " + e);
    }

    return addressList;
};