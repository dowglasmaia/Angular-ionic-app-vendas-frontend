import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  codPedido: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    //Pegando o Carrinho de Compra
    this.cartItems = this.cartService.getCart().items;

    //buscando o Cliente por ID, que estar logado
    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;

      //endereço de entrega
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
    },
    error => {
      //se ouver algum error volta para a pagina inicial e obriga o usuario a fazer o login novamente
      this.navCtrl.setRoot('HomePage');
    });
  }

  //buscando Endereço, e retornando o endereço que seja igual ao endereço selecioando no pedido
  private findEndereco (id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  // mostrando o Valor total do pedido
  total() {
    return this.cartService.total();
  }

  //Metodo para retorna a pagina do carrinho
  back() {
    this.navCtrl.setRoot('CartPage');
  }

  //Metodo para retorna a pagina de Categorias
  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  //finalizando Pedido
  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(response => {
      //limpando o carrinho
      this.cartService.creatOrClearCart();

      //extraindo o ID do novo Pedido  e Armazendo no codPedido
      this.codPedido = this.extractId(response.headers.get('location'));
    },
    error => {
      if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
      }
    })

  }

  //extraindo o ID da url
  private extractId(location: string) : string {
    let position = location.lastIndexOf('/'); // pega o ultimo caracter da string depois da barra
    return location.substring(position + 1, location.length);
  }
 

}
