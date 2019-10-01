import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../sevices/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../sevices/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //atributo email e carregá-lo do storage
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  //pegar o cliente no storage e buscar o cliente por email
  ionViewDidLoad() {
   this.loadData();
    
  }

  loadData() {

    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      //buscar o cliente por email e imagem avatar
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //informa ao compilador que esta resposta vai casar com o ClienteDTO(retorna o objeto completo do cliente)
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
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
  //testa se a imagem existe
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    //se retornar com sucesso a imagem existe
    .subscribe(reponse =>{
      //e atribui a url do bucket no campo imageUrl do cliente
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

  getCameraPicture() {

    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
     // Handle error
    });

  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture) 
      .subscribe(response => {
        //depois que enviou a imagem para o s3 colocar a picuture como null
        this.picture = null;
        //forca o carregamento dos dados
        this.loadData();
      },
      error => {

      })

    }

    cancel() {
      this.picture = null;
    }
}


  


