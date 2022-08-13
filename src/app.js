App = {
    contracts: {},
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.verifyContract()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Account info hai
      // Ek id banade aur append karde ye account info
      App.account = web3.eth.accounts[0]
      console.log(App.account)
    },
    loadContract: async() =>{
        //Idhar no. of certificates dikhate hai
        
        const thelist=await $.getJSON('Storing.json')
        App.contracts.thelist=TruffleContract(thelist)
        App.contracts.thelist.setProvider(App.web3Provider)
        console.log(thelist)

    },
    renderContracts: async()=>{

        const count=await App.Storing.blockcount();
        //Idhar se bhi template daaldo
    },
    verifyContract: async()=>{
        const count=await App.Storing.blockcount();
        //ye sab banane hai verify ke page me
        const hash=document.getElementById('Hash').value
        const roll=document.getElementById('Rollno').value
        for (var i=0;i<=count;i++){
            const stored=await App.Storing.tasks[i];
            const task_id=stored[0].toNumber();
            const hash_st=stored[1];
            if(task_id=roll && hash_st==hash){
                //aur ek template
                console.log('Verified hai')
            }
            else{
                //template aur ek
                console.log('Fake hai bhai')
            }

            

        }
    },
    addContract: async()=>{
        const rollno=document.getElementById('roll')
        const email=document.getElementById('email')
        const mark1=document.getElementById('mark1')
        const mark2=document.getElementById('mark2')
        const mark3=document.getElementById('mark3')
        //idhar hi hash karna hai kya bolo???
        //const content_for_hash isme vo hash aur var daalte hai
        await App.Storing.createHash(roll,hash)
    }
    
  
    
  
  
    
  
    
  }
  $(()=>{
    $(window).load(()=>{
        App.load()
    })
  })
  

