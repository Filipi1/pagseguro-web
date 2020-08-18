import { Injectable } from '@angular/core';

declare var PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class PagseguroService {

  constructor(private sandbox: boolean) { }

  // INICIALIZA O PAGSEGURO
  protected initPagseguro() : Promise<any> {
    return new Promise((resolve, reject) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.addEventListener("load", r => resolve());

      let url: string = this.sandbox 
      ? "https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js" 
      : "https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";

      script.src = url;
      document.head.appendChild(script);
    })
  }

  // DEFINE A SESSÃO OBTIDA DO BACKEND
  protected setSessionId(sessionId: string) {
    PagSeguroDirectPayment.setSessionId(sessionId);
    console.log(PagSeguroDirectPayment);
  }

  // OBTÉM A BANDEIRA DO CARTÃO
  protected getCardBrand(cardNumber: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.getBrand({
        cardBin: cardNumber,
        success: res => {
          resolve(res.brand.name)
        },
        error: err => reject(err)
      });
    })
  }

  // OBTÉM OS MÉTODOS DE PAGAMENTO DISPONÍVEIS
  protected getPaymentMethods(amount: number): Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.getPaymentMethods({
        amount: amount,
        success: function(response) {
          resolve(response)
        },
        error: function(response) {
          reject(response)
        }
      });
    })
  }

  // OBTÉM A HASH DO COMPRADOR
  protected onSenderHashReady() : Promise<string> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.onSenderHashReady(function(response){
        if(response.status == 'error') {
            console.log(response.message);
            reject(false);
        }
        var hash = response.senderHash;
        resolve(hash);
      });
    })
  }

  // RETORNA AS OPÇÕES DE PARCELAMENTO DISPONÍVEIS
  protected getInstallments(amount: number, maxInstallmentNoInterest: number, brand: string): Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.getInstallments({
        amount,
        maxInstallmentNoInterest,
        brand,
        success: function(response){
          resolve(response)
        },
        error: function(response) {
          reject(response)
        }
      });
    })
  }

  // RETORNA A TOKEN DO CARTÃO
  protected createCardToken(cardNumber: string, brand: string, cvv: string, expirationMonth: string, expirationYear: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber,             // Número do cartão de crédito
        brand,                  // Bandeira do cartão
        cvv,                    // CVV do cartão
        expirationMonth,        // Mês da expiração do cartão
        expirationYear,         // Ano da expiração do cartão, é necessário os 4 dígitos.
        success: function(response) {          
          resolve(response.card.token);
        },
        error: function(response) {
          reject(response);
        }
      });
    })
  }
}
