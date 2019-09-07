// Dependencies
const KinClient = require('@kinecosystem/kin-sdk-node').KinClient;
const Environment = require('@kinecosystem/kin-sdk-node').Environment;
const environement = new Environment({
    name: 'poy env',
    url: 'network url',
    passphrase: 'network passphrase',
    friendbotUrl: 'friendbot url' //Optional param for testnet only
});
// async http request
const superagent = require('superagent');
// Instance object new KinClient Poy
const client = new KinClient(Environment.Testnet);
// Generate KeyPair
const KeyPair = require('@kinecosystem/kin-sdk-node').KeyPair;
const keyPairPoy = KeyPair.generate();
const keyPairHaydal = KeyPair.generate();
// Create new Client KIN with friendbot and return value account in promise
const promisePoy = client.friendbot({ address: keyPairPoy.publicAddress, amount: 1000 }).then(response => {
    // Init KinAccount
    let accountPoy = client.createKinAccount({ seed: keyPairPoy.seed, appId: 'poy' });
    // Return Promise[value]
    return Promise.resolve(accountPoy);
});
(async function waitBalance(){
    let newBalancePoy = await newBalance();
    console.log(newBalancePoy);
})();

function newBalance () {client.friendbot({ address: keyPairHaydal.publicAddress, amount: 1000 }).then(response => {
    // Init KinAccount
    let accountHaydal = client.createKinAccount({ seed: keyPairHaydal.seed, appId: 'poy2' });
    accountHaydal.buildSendKin({
        amount: 100,
        memoText: 'Hello Haydal',
        address: keyPairPoy.publicAddress,
        fee: 100
    }).then(transactionBuilder => {
        accountHaydal.submitTransaction(transactionBuilder).then(transactionHash => {
            console.log("The transaction succeeded with the hash ", transactionHash);
            waitBalance();
        });
    });
    // Return Promise[value]
    return Promise.resolve();
})};

// promiseHaydal.buildCreateAccount({
//     fee: 100,
//     startingBalance: 2,
//     memoText: "Test create account Haydal",
//     address: keyPairHaydal.publicAddress
// }).then(transactionBuilder => {
//     promiseHaydal.submitTransaction(transactionBuilder).then(transactionHash => {
//         console.log("We created the account and got the transaction id: ", transactionHash);
//     })
// });

//
// account.buildCreateAccount({
//     address: 'address',
//     startingBalance: 10,
//     fee: 100,
//     memoText: 'my first account' //a text memo can also be added; memos cannot exceed 21 characters
// })
//     .then(createAccountBuilder => {
//         return account.submitTransaction(createAccountBuilder)
//     }).then(transactionId => {
// });
//
// const accountAddress = account.publicAddress;
//
// client.isAccountExisting('address')
//     .then(exist => {
//         if (exist){
//             console.log('GG Poy !')
//         }
//     });
//
// client.getAccountBalance('address')
//     .then(balance => {
//     });
//
// client.getAccountData('address')
//     .then(accountData => console.log(accountData))