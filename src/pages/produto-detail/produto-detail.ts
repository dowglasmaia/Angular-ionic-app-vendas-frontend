import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    //pegando o id passado no formulario
    let produto_id = this.navParams.get('produto_id');

       let loader = this.presentLoading(); // chamo o loader
    this.produtoService.findById(produto_id).subscribe(response => {
      this.item = response;

      loader.dismiss();
      this.getImageUrlIfExists();
    },
    error => {})
  }

  //Buscando a imagem do produto caso Ela exista 
  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    },
    error => {})

  }
  //add produto ao carrinho
  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

  /* Load de processor*/
  presentLoading() {
    let loading = this.loadingController.create({
      content: 'Aguarde...',
      //duration: 3000
    });
    loading.present();
    return loading;
  }

}
