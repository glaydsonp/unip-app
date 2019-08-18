import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user: any;
  // public usuario: any;

  @ViewChild('usuario', { static: false }) email;
  @ViewChild('senha', { static: false }) password;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public firebaseauth: AngularFireAuth) {
    firebaseauth.user.subscribe((data => {
      this.user = data;
    }));
  }
  public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid).set({
          email: this.email.value,
          password: this.password.value
        }).then(() => {
          this.exibirToast('Usuário criado com sucesso');
        });
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public Sair(): void {
    this.firebaseauth.auth.signOut()
      .then(() => {
        this.exibirToast('Você saiu');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
  }
}

