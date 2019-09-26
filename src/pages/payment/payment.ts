import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  //vai ser recebido pela pagina onde se ecolhe o endereço(pick-address.ts do método nextPage)
  pedido: PedidoDTO;

  //parcelas vetora de numeros dos numeros da parcela
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //formulario para controlar a tela
  formGroup : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    //objeto pedido que vira como parametro na navegacao da pagina de endereco
    //pega o obj pedido que vem de outro pagina
    this.pedido = this.navParams.get('pedido');
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required], 
      //o nome pagamentoComCartao tem que igual ao nome que está no @JsonTypeName("pagamentoComCartao") na classe PagamentoComCartao no java
      "@type":["pagamentoComCartao", Validators.required]
    });
  }

 nextPage() {
   //dados que foram preenchidos no html payment.html
   this.pedido.pagamento = this.formGroup.value;
   this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
   
 }

}
