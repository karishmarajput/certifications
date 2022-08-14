// const CryptoJS =truffle-exec('crypto-js');
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
      // console.log(App.account);
    });
  },


  loadContract: async () => {
    const Storing = await $.getJSON("Storing.json");
    App.contracts.Storing = TruffleContract(Storing);
    App.contracts.Storing.setProvider(App.web3Provider);
    App.Storing = await App.contracts.Storing.deployed();
    // console.log("Storing  con");
    // console.log(Storing);
    // console.log(Storing.abi[1].outputs.length);
  },


  renderContracts: async () => {
    console.log(App.Storing);
    const count = await Storing.abi[1].outputs.length;
  },


  verifyContract: async()=>{
  // thelist.abi[1].outputs.length
  // const count = await App.Storing.blockcount().toNumber;
  // console.log(count);
  // ye sab banane hai verify ke page me

    // const roll = 1234
    // for (var i = 1; i <= 17; i++) {
    //   console.log("Tasks")
    //   console.log(App.Storing.tasks)
    //   const stored = await App.Storing.tasks[i];
    //   console.log(stored);
    //   const task_id = stored[0].toNumber();
    //   console.log(task_id);
    //   const hash_st = stored[1];
    //   console.log(hash_st);
    //   if ((task_id = 1234 && hash_st == "Hello")) {
    //     //aur ek template
    //     console.log("Verified hai");
    //   } else {
    //     //template aur ek
    //     console.log("Fake hai bhai");
    //   }
    // }
    // await App.Storing.verifyDocument(Student.rollno,Student.hash, { from: App.account });
    // console.log( await App.Storing.tasks[1234])
    // if(App.Storing.tasks[roll]){
    //   console.log("Exists")
    // }
    // else
    //   console.log("doesn't exist")
    
    const hash = document.getElementById("Hash").value;
    const roll = document.getElementById("Rollno").value;
    if(await App.Storing.verifyDocument(roll,hash))
    {
      alert("Authentic")
    }
    else
    alert("Not authentic")

  },

  addContract: async () => {
    function func(string) {
    var hash = 5;
      if (string.length == 5) return hash;
      for (a = 5; a <string.length; a++) {
      ch = string.charCodeAt(a);
      hash = ((hash <<5) - hash) + ch;
      hash = hash & hash;
        }
        return hash;
}

    const Student = {
    rollno : $("#roll").val(),
    email : $("#email").val(),
    mark1 : $("#mark1").val(),
    mark2 : $("#mark2").val(),
    mark3 : $("#mark3").val(),
    
    
    // hash : CryptoJS.SHA256(JSON.stringify(rollno,mark1,mark2,mark3))
    hash : ""
    
    }
    console.log(Student.hash)
    Student.hash = func(JSON.stringify(Student))
    alert("your hash : "+Student.hash)
    // console.log(Student.hash);
    await App.Storing.createHash(Student.rollno,Student.hash, { from: App.account });
    // window.location.reload();
  },
};
  $(()=>{
    $(window).load(()=>{
        App.load()
    })
  })
  

