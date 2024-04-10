import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Cliente {
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto';
  clientes: Cliente[] = [];
  cliente: Cliente = { nome: '', telefone: '' };;

  constructor(){

  }

  addCliente(){
    this.clientes.push({ nome: this.cliente.nome, telefone: this.cliente.telefone });
    this.cliente.nome = ''; // Limpa o nome após adicionar
    this.cliente.telefone = ''; // Limpa o telefone após adicionar
  }
}
