import { EventEmitter, Injectable } from '@angular/core';
import { ethers } from "ethers";
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
          that.logout();
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

  logout(): void {
    localStorage.removeItem('eth');
    this.user = {account: null, connected: false };
    this.accountConnected.emit(this.user);
    this.router.navigate(['/']);
    this.toastr.info('You have disconnected!');
  }

  toHex(str: string) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

  pay(amount: string, name: string) {
    let params = [
      {
        from: this.user.account,
        to: '0x78e08B4ED81C7E2AF78EEd96e8b53745ebf967fd',
        gas: '30400', // 30400
        // gasPrice: '0x9184e72a000', // 10000000000000
        value: Web3.utils.toHex(Web3.utils.toWei(amount, 'ether')), // 2441406250
        data:
          '0x' + this.toHex(name),
      }
    ];

    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result: any) => {
        this.toastr.success('Payment processed correctly. Your event will be listed soon.');
        setTimeout(() => {
          location.href="https://nftpromotion.tools"
        }, 3000);
      })
      .catch((error: any) => {
        this.toastr.error(error);
      });
  }

}
