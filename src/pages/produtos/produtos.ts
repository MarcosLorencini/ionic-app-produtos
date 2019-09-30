import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../sevices/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  //inicia vazia, para concatenar a lista que já existia com a proxima lista que está sendo carregada
  items : ProdutoDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    //mostra o loading na tela
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    //pega o id da categoria vindo do categoria.ts
    let categoria_id = this.navParams.get('categ_id');
    //abre o loading
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        //pega o tamanho da lista antes de concatenar
        let start = this.items.length;
        //retorna de um endpoint paginado(muitos produtos) pegar somente do atributo "content" 
        //concateando com a lista que já existia
        this.items = this.items.concat(response['content']);
        //pega o tamanho da lista após concatenar
        let end = this.items.length - 1;
        //fecha o loading
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        //chama após chegar os produtos
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }
  

  //método para setar as URL's das imagens de miniatura dos produtos na variavel imageUrl
  //start e end usado para não pegar a imagens novamente
  loadImageUrls(start : number, end : number) {
    for(var i=start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error =>{});
    }
  }
  //envia o id do produto para a pagina ProdutoDetailPage
  showDetail(produto_id : string) {
    this.navCtrl.push("ProdutoDetailPage", {prod_id: produto_id});
  }
  //cria o loading na tela
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
  //comportante de loading quando puxa a tela para baixo
  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    //realiza(atualiza) a requisao dos produtos
    this.loadData();
    //depois de 1 seg fecha o refresh
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    //no final da pagina incrementa a pagina e chama novamente o loadData
    this.page++;
    this.loadData();
    //excuta algo antes e desliga a animacao de carregando:
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
