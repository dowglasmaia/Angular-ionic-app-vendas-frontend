import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    /* pegando o parametro que é passado na na pagina de Categorias */
    let categoria_id = this.navParams.get('categoria_id');

       let loader = this.presentLoading(); // chamo o loader
    /* listando os produtos com base na sua categoria e abrindo a pagina  de produtos*/
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      this.items = response['content'];
          loader.dismiss();  // fechar a janela de loader quando tiver a respostas dos Dados
      this.loadImageUrls();

    },
    error => {
      loader.dismiss();  // fechar o loader caso aconteca algum Error
    });

  }

  /* Setando imagem ao produto caso a mesma exista */
  loadImageUrls() {
    //percorrendo a lista de itens para atribuir a imagens respectiva ao mesmo
    for (var i=0; i<this.items.length; i++){
       let item = this.items[i];
       this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {})
    }
  }

  /* Abri pagina de Detalhes dos produtos */
  showDetail(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id: produto_id});
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
