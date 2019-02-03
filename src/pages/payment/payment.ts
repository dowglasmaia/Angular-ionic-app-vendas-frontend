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

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuild: FormBuilder) {

      //pegando o Pedido que veio como paramento
      this.pedido = this.navParams.get('pedido');

      
      this.formGroup = this.formBuild.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pgtoComCartao", Validators.required]
      })
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;  // Passando os dados q foram informados na pagina html
    
    // chamando a pagina de confirmação de Pedido com setRoot, passando o objeto pedido
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});

  }

}
