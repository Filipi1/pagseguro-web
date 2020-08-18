import { Component, OnInit } from '@angular/core';
import { PagseguroService, UserData } from '../../services/pagseguro.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PagseguroService implements OnInit {
  
  btnText: string = "Desligado"

  temp: UserData = new UserData();

  constructor() { 
    super(environment.production);
  }

  ngOnInit(): void {
    this.initPagseguro().then(res => {
      this.btnText = "Obter SessionID"
    });
  }

  session() {
    this.setSessionId("6d9d372a26f44c56bb549b1e2343d7b6")
    this.temp.sessionId = "6d9d372a26f44c56bb549b1e2343d7b6"
  }

  cardBrand() {
    this.getCardBrand("5257782603874647").then((brand) => {
      console.log(brand)
      this.temp.bandeira = brand;
    }, e => {
      console.log(e)
    })
  }

  senderHash() {
    this.onSenderHashReady().then(hash => {
      this.temp.hashComprador = hash;
      console.log(hash)
    })
  }

  getCardToken() {
    this.createCardToken('4111111111111111', 'visa', '013', '12', '2026').then(token => {
      this.temp.tokenCard = token;
      console.log(token)
    })
  }
}
