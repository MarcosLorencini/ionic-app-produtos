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

  items : ProdutoDTO[];

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
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        //retorna de um endpoint paginado(muitos produtos) pegar somente do atributo "content" 
        this.items = response['content'];
        //fecha o loading
        loader.dismiss();
        //chama após chegar os produtos
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      });
  }
  

  //método para setar as URL's das imagens de miniatura dos produtos na variavel imageUrl
  loadImageUrls() {
    for(var i=0; i < this.items.length; i++) {
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
    //realiza(atualiza) a requisao dos produtos
    this.loadData();
    //depois de 1 seg fecha o refresh
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
