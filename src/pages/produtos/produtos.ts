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

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  /* Carregando os Dados*/
  loadData() {

    /* pegando o parametro que é passado na na pagina de Categorias */
    let categoria_id = this.navParams.get('categoria_id');

       let loader = this.presentLoading(); // chamo o loader

    /* listando os produtos com base na sua categoria e abrindo a pagina  de produtos*/
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
        .subscribe(response => {

          let start = this.items.length; // tamanho da lista inicial
                this.items = this.items.concat(response['content']);
          let end = this.items.length - 1; // tamanha da lista apos o carregamento dos itens

         loader.dismiss();  // fechar a janela de loader quando tiver a respostas dos Dados

      console.log(this.page);
      console.log(this.items);

      this.loadImageUrls(start, end);

    },
    error => {
      loader.dismiss();  // fechar o loader caso aconteca algum Error
    });

  }

  /* Setando imagem ao produto caso a mesma exista */
  loadImageUrls(start: number, end: number) {
    //percorrendo a lista de itens para atribuir a imagens respectiva ao mesmo
    for (var i=start; i<end; i++){
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
      
    });
    loading.present();
    return loading;
  }

  /* https://ionicframework.com/docs/v3/2.0.0/api/components/refresher/Refresher/*/
  doRefresh(refresher) {
    this.page = 0; //zerando a lista para fazer o refresh
    this.items = [];

    this.loadData();
    setTimeout(() => {      
      refresher.complete();
    }, 1000);
  }


  doInfinite(infiniteScroll) {
    this.page ++;

    this.loadData();

    setTimeout(() => {      
      infiniteScroll.complete();
    }, 1000);
  }
}
