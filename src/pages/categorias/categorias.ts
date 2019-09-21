import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../sevices/domain/categoria.service';
import { CategoriaDTO } from '../../models/Categoria.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response => {
      //recebe as categorias do servico
     this.items = response;
    },
    //recece a propagacao do erro do interceptor
    error => {});
  }

  //abre a página de produtos
  showProdutos() {
    this.navCtrl.push('ProdutosPage');

  }
}
