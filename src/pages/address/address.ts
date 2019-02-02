import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorangeService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  //Coleção de Endereços
  items: EnderecoDTO [];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorangeService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
   
    // Buscar Endereços do Cliente Logado.
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
        this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {this.items = response['enderecos'];

        //Pegando os itens do carrinho de compras
        let cart = this.cartService.getCart();

        //pedido
        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,

          //percorendo todos os itens e selecionando apenas a quantidade e a referencia para o produto 
          itens : cart.items.map(x => { return {quantidade: x.quantidade , produto: {id: x.produto.id} }})
        }
       
        },
        error => {
          if (error.status == 403) {
              this.navCtrl.setRoot('HomePage'); // direciona para pagina Home(login) caso ocora um erro 403
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage'); // direciona para pagina Home(login) caso ocora um erro 403
    }
  }


  //escolhendo o endereço do pedido
  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};

    console.log(this.pedido);
  }

}
