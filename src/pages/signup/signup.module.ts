import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../sevices/domain/cidade.service';
import { EstadoService } from '../../sevices/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  //cadastrou os providers aqui, pois somente o sigunp está usando
  providers: [
    CidadeService,
    EstadoService

  ]
})
export class SignupPageModule {}
