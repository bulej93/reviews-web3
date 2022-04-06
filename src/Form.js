import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ReviewsContract from './artifacts/contracts/Reviews.sol/Reviews.json';

const ReviewsAddres = '0xCc88F7533ac877Dd274c67dDA2311c8182C03549'; //Rinkeby address



const Form = () => {
    
    
useEffect(() => {
    requestAccount()
})

    const [account, setAccount] = useState('')
    const [Store, setStore] = useState('')

    async function requestAccount () {

        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts'})
          const signer = provider.getSigner();
          const signerAddress = await signer.getAddress();
          setAccount(signerAddress)
          console.log('connected to ', signerAddress)
        } else {
          window.alert('install metamask')
        }
      }

      //create store
      async function CreateStore() {
          if (window.ethereum != 'undefined') {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const Contract = new ethers.Contract(ReviewsAddres, ReviewsContract.abi, signer)
            
            const createStore = await Contract.createStore(Store)
            await createStore.wait()
          }
      }





    return ( 
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <label for="text" class="col-form-label">Store Name</label>
            </div>
            <div class="col-auto">
                <input type="text" id="inputText" class="form-control" aria-describedby="" onChange={(e) => setStore(e.target.value)}></input> <br />
                <button class="btn btn-primary btn-md" type="submit" onClick={CreateStore}>Create Store</button>
            </div>
            
            <br />
            <div class="col-auto">
            <label for="text" class="col-form-label">Review</label>
            </div>
            <br />
            <div class="col-auto">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="col-auto">
            </div>

            <hr />
            <p>your account is : {account}</p>
            <p>the store is {Store}</p>
        </div>
        
     );
}
 
export default Form;
