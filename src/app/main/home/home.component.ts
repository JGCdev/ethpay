import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  connected: boolean = false;
  metamaskInstalled = false;
  collectionName: any = 'Unnamed';
  selectedOption: string = '0.05';

  constructor(private w3s: Web3Service, private cdr: ChangeDetectorRef, private route: ActivatedRoute) { 
      if (this.w3s.isMetamaskInstalled()) {
        this.metamaskInstalled = true;
      }
      this.w3s.accountConnected.subscribe( (res) => {
        console.log('RES: ', res);
        res.connected ? this.connected = true : this.connected = false;
        this.cdr.detectChanges();
      });
      // http://localhost:4200/?name=dsdfsd
      this.route.queryParams.subscribe( (res: any) => {
        if ( res?.name) {
          this.collectionName = res.name;
        }
      });
      localStorage.getItem('ethPT') ? this.connected = true : this.connected = false;
  }

  pay() {
    this.w3s.pay(this.selectedOption, this.collectionName);
  }
  
  connect() {
    this.w3s.connect();
  }

  metamask() {
    
  }
}
