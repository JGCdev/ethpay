import { EventEmitter, Injectable } from '@angular/core';
// import { abiContract } from './abiRopsten'; 
import { abiContract } from './abiProd'; 
import { ethers } from "ethers";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var Web3: any;
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: any;
  provider: any;
  signer: any;
  user: any = {};
  accountConnected: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private toastr: ToastrService) { 
    const that = this;
    if (this.isMetamaskInstalled()) {
      console.log('MetaMask is installed!');
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.provider.getSigner()
      // this.web3 = new Web3(environment.RINKEBY_URL);
      window.ethereum.on('accountsChanged', function (accounts: any) {
        if (accounts[0] === undefined || accounts.length == 0) {
          that.logout();
        } else {
          that.user = {account: accounts[0], connected: true };
          that.accountConnected.emit(that.user);
        }
      })
      
      window.ethereum.on('networkChanged', function () {
        // Network changed, logout
        that.logout();
      })
    }
  }

  isMetamaskInstalled(): boolean {
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
  }

  async connect(): Promise<boolean> {
    const accountsRequest = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // console.log('Accounts req: ', accountsRequest);
    if (accountsRequest[0]) {
      this.user = {account: accountsRequest[0], connected: true };
      this.accountConnected.emit(this.user);
      localStorage.setItem('eth', accountsRequest[0]);
      this.toastr.success('Your are now connected!');
      return true
    }
    this.toastr.error('Error connecting!');
    return false;
  }

  // getAvailableNFT(): Promise<number> {
  //   let MyContract = new this.web3.eth.Contract(abiContract, environment.RINKEBY_CONTRACT);
  //   // console.log('Contract: ', MyContract);
  //   return MyContract.methods.totalSupply().call();
  // }

  // async mint(selected: number): Promise<any> {
  //   let contract = new ethers.Contract(environment.RINKEBY_CONTRACT, abiContract, this.signer)
  //   const transaction = await contract["mint"](selected, {value: String(environment.MINTING_VALUE * selected)});
  //   // console.log('Trans 1: ', transaction);
  //   await transaction.wait();
  //   return transaction;
  // }

  // getConnectedAccountNFTs() {
  //   let MyContract = new this.web3.eth.Contract(abiContract, environment.RINKEBY_CONTRACT);
  //   return MyContract.methods.checkWallet(this.user.account).call();
  // }

  logout(): void {
    localStorage.removeItem('eth');
    this.user = {account: null, connected: false };
    this.accountConnected.emit(this.user);
    this.router.navigate(['/']);
    this.toastr.info('You have disconnected!');
  }

  // async verifyOwnerGeneric( id: string) {
  //   const signature = await window.ethereum.request({ method: 'personal_sign', params: [ "Proving I Have a MoonZilla", this.user.account ] });
  //   // const signature = await this.web3.eth.sign("Hello world", this.user.account);
  //   // const signature = await this.web3.eth.personal.sign("Hello world", this.user.account)
  //   window.location.href = `${environment.BACK_URL}/verifyRole?&mes=${signature}&user=${id}`;
  // };

  pay() {
    window.ethereum.sendTransaction({from:this.user.account,to:'0x3b24193e425aebA2531D594E69eBCE32cE9D8ab9',value:Web3.toWei(100,'finney'),data:Web3.toHex('John Doe sent you a message')})
    // eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(1‌​00,'finney'),data:web3.toHex('John Doe sent you a message')})
  }

}
