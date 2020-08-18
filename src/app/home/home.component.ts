import { Component, OnInit } from '@angular/core';
import { PagseguroService } from '../../services/pagseguro.service';
import { environment } from 'src/environments/environment';
import { UserData } from '../../share/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagseguroService implements OnInit {
  
  isLoading = true;

  temp: UserData = new UserData();

  constructor() { 
    super(environment.production);
  }

  ngOnInit(): void {
    this.initPagseguro().then(res => {
      this.isLoading = false;
    });
  }

  session() {
    this.setSessionId("85bd0607b03246cb8931fabce67168ea")
    this.temp.sessionId = "85bd0607b03246cb8931fabce67168ea"
  }

  cardBrand() {
    this.isLoading = true;

    this.getCardBrand("5257782603874647").then((brand) => {
      console.log(brand)
      this.temp.bandeira = brand;
      this.isLoading = false 
    }, e => {
      console.log(e)
      this.isLoading = false 
    })
  }

  senderHash() {
    this.isLoading = true;
    
    this.onSenderHashReady().then(hash => {
      this.temp.hashComprador = hash;
      this.isLoading = false;
    }, e => {
      this.isLoading = false;
    })
  }

  getCardToken() {
    this.isLoading = true;

    this.createCardToken('4111111111111111', 'visa', '013', '12', '2026').then(token => {
      this.temp.tokenCard = token;
      this.isLoading = false;
    }, e => {
      this.isLoading = false;
    })
  }
}
