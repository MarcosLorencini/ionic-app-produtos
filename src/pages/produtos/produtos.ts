import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../sevices/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


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
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    //pega o id da categoria vindo do categoria.ts
    let categoria_id = this.navParams.get('categ_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        //retorna de um endpoint paginado(muitos produtos) pegar somente do atributo "content" 
        this.items = response['content'];
        //chama após chegar os produtos
        this.loadImageUrls();
      },
      error => {});
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
  //mostra os detalhes do produto
  showDetail() {
    this.navCtrl.push("ProdutoDetailPage");
  }

}
