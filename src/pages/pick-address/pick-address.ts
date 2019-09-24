import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../sevices/storage.service';
import { ClienteService } from '../../sevices/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      //buscar o cliente por email e imagem avatar
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //pega os enderecos que retornar do cliente
          this.items = response['endereco'];
         
        },
        error => {
          if(error.status == 403){
            //direciona para home
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      //caso ocorra algum problema para pegar o localUser direceiona para a home
      this.navCtrl.setRoot('HomePage');
    }
    
  }

}
