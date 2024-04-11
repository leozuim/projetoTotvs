import { Component } from '@angular/core';
import { BaserowService } from './baserow.service';

interface Cliente {
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto';
  clientes: Cliente[] = [];
  cliente: Cliente = {nome: '', telefone: '' };
  clienteIndex: number = -1;

  constructor(private baserowService: BaserowService) {}

  ngOnInit() {
    this.obterClientes();
  }

  obterClientes() {
    this.baserowService.getClientes().subscribe(
      (data: any) => {
        this.clientes = data.results;
      },
      error => {
        console.error('Erro ao obter clientes:', error);
      }
    );
  }

  addCliente() {
    if (this.cliente.nome && this.cliente.telefone) {
      this.baserowService.adicionarCliente(this.cliente).subscribe(() => {
        this.obterClientes(); // Atualiza a lista de clientes após adicionar um novo
        this.cliente = { nome: '', telefone: '' }; // Limpa os campos do formulário após adicionar
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  editarCliente(index: number) {
    const cliente = { ...this.clientes[index] };
    this.cliente = cliente;
    this.clienteIndex = index;
  }

  salvarEdicao() {
    if (this.clienteIndex !== -1) {
      this.baserowService.editarCliente(this.cliente).subscribe(() => {
        this.obterClientes(); // Atualiza a lista de clientes após editar
        this.clienteIndex = -1;
        this.cliente = {nome: '', telefone: '' }; // Limpa o cliente após a edição
      });
    }
  }

  excluirCliente(clienteId: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.baserowService.excluirCliente(clienteId).subscribe(() => {
        this.obterClientes(); // Atualiza a lista de clientes após excluir
      });
    }
  }
}
