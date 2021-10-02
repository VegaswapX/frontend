//TODO: disconnect
//TODO: handle error eg. evert BoostPool: can only stake once
//TODO: stake USDT


const ethereumButton = document.querySelector('#connectWeb3');
const statusEl = document.querySelector('#status');
const showAccount = document.querySelector('#account');
let currentAccount;
let web3;
let tokenABI;
let poolABI;
let reward;
let ethereum;
let connected = false;
let afterConnectCallback;
let BoostPool;
let VegaToken;
let stakeAmount;
const vega_contactAddress = "0x18A1938C6D7bCC9459f13832210707FcaEaAB201";
const pool_contactAddress = "0x081d2605123B574459A014b963d0ad323D336959";


function detectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {                
      return true
  } else {                
      return false
  }
}

function handleAccountsChanged(accounts) {
  console.log('Calling HandleChanged')
  
  if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      // $('#enableMetamask').html('Connect with Metamask')
  } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // $('#enableMetamask').html(currentAccount)
      // $('#status').html('')
      
      if(currentAccount != null) {
          // Set the button label
          showAccount.innerHTML = currentAccount;
          ethereumButton.innerHTML = "Connected";

          console.log('>> ' + currentAccount)
          // let a = Web3.utils.toChecksumAddress(currentAccount);


      }
  }
  console.log('WalletAddress in HandleAccountChanged ='+currentAccount)
}


async function connect() {
  console.log('Calling connect()')
  if (window.ethereum) {

    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      connected = true;
      accounts = await web3.eth.getAccounts();
      currentAccount = accounts[0];
      
      afterConnectCallback();
      
    } catch (error) {
      console.error(error);
    }

    window.ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      console.log("accountsChanged " + accounts)

      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        console.log("currentAccount " + currentAccount);
      }
    });
    
    window.ethereum.on('networkChanged', function (networkId) {
      // Time to reload your interface with the new networkId
      console.log("networkChanged " + networkId)
    })
    
  }

  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
  
}

async function setBalance(){
  console.log("currentAccount " + currentAccount);
  var balance = await web3.eth.getBalance(currentAccount)/10**18;
  console.log("balance " + balance);
  document.querySelector("#balance").innerHTML = balance;

  document.querySelector("#account").innerHTML = currentAccount;

}

async function stake(){
  //TODO check allowance
  let amount = stakeAmount;
  if (amount > 0){
    BoostPool.methods.stake(amount).send({from:currentAccount}).then(function (result) {
      console.log(result);
      if (result.status) {
        console.log("approved")
        setValues()
        
      } else {
        console.log("not approved")
      }
      
    });
  }
  
}

async function approve(){
  console.log("approve")

  VegaToken.methods.approve(pool_contactAddress, 100).send({from:currentAccount}).then(function (result) {
    console.log(result);
    if (result.status) {
      console.log("approved")
      setValues()
      
    } else {
      console.log("not approved")
    }
  });
}

async function setValues() {
  console.log('setValues ' + currentAccount)

  if (currentAccount){
    
    document.querySelector("#balance").innerHTML = balance;

    VegaToken = new web3.eth.Contract(
      tokenABI,
      vega_contactAddress
    );

    BoostPool = new web3.eth.Contract(
      poolABI,
      pool_contactAddress
    );

    BoostPool.methods.totalAmountStaked().call().then(function(result) {
      console.log("totalAmountStaked " + result);
      $('#totalstaked').html(result);
    });

    BoostPool.methods.stakes(currentAccount).call().then(function(result) {
      console.log("stakes " + result.stakeAmount);
      $('#staked').html(result.stakeAmount);

    });
    
    
    BoostPool.methods.reward().call().then(function(result) {
      reward = result;
      $('#reward').html(result);
    });


    // BoostPool.methods.reward

    // VegaToken.methods.totalSupply().call().then(function (result) {                
    //   $('#totalsupply').html(result/10**18)
    // });

    VegaToken.methods.balanceOf(currentAccount).call().then(function (result) {                
      $('#vgabalance').html(result/10**18)
    });

    VegaToken.methods.allowance(currentAccount, pool_contactAddress).call().then(function (result) {                
      $('#vgaallowance').html(result/10**18)
    });
    
  } else {
    console.log("no account loaded");
  }

}

async function loadContracts() {

}

async function loadWeb3() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }


  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    //TODO
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
}

afterConnectCallback= function() {
  console.log("afterConnectCallback")
  ethereumButton.innerHTML = "Connected";
  ethereumButton.disabled = true;
  setBalance();

  setValues()
}

$( document ).ready(function() {
  // boostApp();
  console.log("ready");

  $.getJSON("./VegaToken.json", function(result) {            
    tokenABI = result.abi
  });

  $.getJSON("./BoostPool.json", function(result) {            
    poolABI = result.abi
  });

  m = detectMetaMask();
  if(m) {
    console.log("metamask installed")
    
    // $('#metaicon').removeClass('meta-gray')
    // $('#metaicon').addClass('meta-normal')
    // $('#enableMetamask').attr('disabled',false)
    connect() 
  } else {
    const msg = "metamask not installed";
    console.log(msg)
    statusEl.innerHTML = msg;
    alert(msg);
    // $('#enableMetamask').attr('disabled',true)
    // $('#metaicon').removeClass('meta-normal')
    // $('#metaicon').addClass('meta-gray')
  }

 
  $('#connectWeb3').click(function() {
    connect()
    console.log(connected);

  });

  // $('#stakeinput').on('input',function(e){
  //   alert('Changed!')
  //  });

   $('#stakeinput').change(function() {
    
  });

  $("#stakeinput").on("input", function(){
    // Print entered value in a div box
    let v = $(this).val();
    try {
      v = parseInt(v);
      if (v >0) {
        // let rewardamount = stakeAmount*15;
        // $("#result").text(rewardamount);
        if (v < 1000){
          stakeAmount = v;
        } else {
          console.log("amount too large")
        }
      }
      
    } catch {

    }
    
  });

  $("#approveButton").on("click", function(){
    approve();
  });

  $("#stakeButton").on("click", function(){
    stake();
  });

  

});

// var waitforWeb3 = function(callback){
//   if(typeof web3 != 'undefined'){
//       callback();
//   } else {
//       var wait_callback = function(){
//           waitforWeb3(callback);
//       };
//       setTimeout(wait_callback, 100);
//   }
// }


 //   ethereum
  //   .request({ method: 'eth_requestAccounts' })
  //   .then(handleAccountsChanged)
  //   .catch((err) => {
  //   if (err.code === 4001) {
  //       // EIP-1193 userRejectedRequest error
  //       // If this happens, the user rejected the connection request.
  //       console.log('Please connect to MetaMask.');
  //       // $('#status').html('You refused to connect Metamask')
  //   } else {
  //       console.error(err);
  //   }
  //   });
  // } else {
  //   const msg = "eth not installed";
  //   console.log(msg)
  //   statusEl.innerHTML = msg;