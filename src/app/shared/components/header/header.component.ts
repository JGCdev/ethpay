import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  connected: boolean = false;
  walletId: string = '';
  metamaskInstalled: boolean = false;
  open: boolean = false;
  constructor(private w3s: Web3Service, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() { 
    this.metamaskInstalled = this.w3s.isMetamaskInstalled();
    if (this.metamaskInstalled) {
      this.w3s.accountConnected.subscribe( (res) => {
        // console.log('Event connected: ', res);
        if (!res.connected ) {
          this.connected = false;
          this.walletId = '';
        } else {
          this.connected = true;
          this.walletId = res.account;
        }
        this.cdr.detectChanges();
      });

      this.checkConnected();
    }
  }

  checkConnected() {
    const eth = localStorage.getItem('ethPT');
    if (eth) {
      // console.log('Emit', eth);
      const user = {account: eth, connected: true };
      this.w3s.accountConnected.emit(user);
      this.w3s.user = user;
    }
  }

  connect() {
    if (this.metamaskInstalled) {
      this.w3s.connect().then( (res) => {
        if (res !== false) {
          this.connected = true;
        }
      });
    }
  }

  logout() {
    this.w3s.logout();
  }

  menu() {
    this.open = !this.open;
  }

}
