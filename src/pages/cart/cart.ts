import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    //pegando o carrinho que estar no localStorage pelo metodo getCart do CartService
    let cart = this.cartService.getCart();

    this.items = cart.items;
    this.loadImageUrls();

   }

    /**
     * verificando se cada produto do carrinho tem a imagem no Backet S3 e
     * Setando a imagem ao produto caso a mesma exista 
     * */
  loadImageUrls() {
    //percorrendo a lista de itens para atribuir a imagens respectiva ao mesmo
    for (var i=0; i<this.items.length; i++){
       let item = this.items[i];
       this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error => {});
    }  
  }

  /**
   * chamando os metodos de serviços da class
   */
  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  incrementQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.incrementQuantity(produto).items;
  }

  derementQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decrementQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }
  
  //direciona o cliente para a pagina de categorias
  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  // finalizar o pedido
  checkout() {
    this.navCtrl.push('AddressPage');
  }

}
