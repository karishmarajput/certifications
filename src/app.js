// const CryptoJS = artifacts.require('crypto-js');
App = {

  contracts: {},
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
  },

  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  //------------------------------------


  loadAccount: async () => {
    await web3.eth.getAccounts().then((acc) => {
      // console.log(acc);
      App.account = acc[0];
      console.log(App.account);
    });
  },


  loadContract: async () => {
    const Storing = await $.getJSON("Storing.json");
    App.contracts.Storing = TruffleContract(Storing);
    App.contracts.Storing.setProvider(App.web3Provider);
    App.Storing = await App.contracts.Storing.deployed();
    console.log("Storing  con");
    console.log(Storing);
    console.log(Storing.abi[1].outputs.length);
  },


  renderContracts: async () => {
    console.log(App.Storing);
    const count = await Storing.abi[1].outputs.length;
  },
  // verifyContract: async()=>{
  // thelist.abi[1].outputs.length
  // const count = await App.contracts.Storing.blockcount().toNumber;
  // console.log(count);
  //ye sab banane hai verify ke page me
  //   const hash = document.getElementById("Hash").value;
  //   const roll = document.getElementById("Rollno").value;
  //   for (var i = 0; i <= count; i++) {
  //     const stored = await App.Storing.tasks[i];
  //     const task_id = stored[0].toNumber();
  //     const hash_st = stored[1];
  //     if ((task_id = roll && hash_st == hash)) {
  //       //aur ek template
  //       console.log("Verified hai");
  //     } else {
  //       //template aur ek
  //       console.log("Fake hai bhai");
  //     }
  //   }
  // },

  addContract: async () => {
    const Student = {
    rollno : $("#roll").val(),
    email : $("#email").val(),
    mark1 : $("#mark1").val(),
    mark2 : $("#mark2").val(),
    mark3 : $("#mark3").val(),
    
    // hash : CryptoJS.SHA256(JSON.stringify(rollno,mark1,mark2,mark3))
    hash :"Hello"
    }
    console.log(Student.hash);
    await App.Storing.createHash(Student.rollno,Student.hash, { from: App.account });
    // window.location.reload();
  },
};
  $(()=>{
    $(window).load(()=>{
        App.load()
    })
  })
  

