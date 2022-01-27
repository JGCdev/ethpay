import { ChangeDetectorRef, Component } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  connected: boolean = false;
  faqOpen: number = 0;
  mintable: number = 0;
  metamaskInstalled = false;
  constructor(private w3s: Web3Service, private cdr: ChangeDetectorRef) { 
      if (this.w3s.isMetamaskInstalled()) {
        this.metamaskInstalled = true;
        this.getTotalSupply();
      }
      this.w3s.accountConnected.subscribe( (res) => {
        res.connected ? this.connected = true : this.connected = false;
        this.cdr.detectChanges();
      });

      localStorage.getItem('eth') ? this.connected = true : this.connected = false;
  }

  getTotalSupply() {
    this.w3s.getAvailableNFT()
    .then( (res: number) => {
      this.mintable = Number(res);
      this.cdr.detectChanges();
    }, (err)=>{
      console.log('Error', err);
    });
  }
}
