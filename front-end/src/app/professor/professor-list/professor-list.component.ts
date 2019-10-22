import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {

  /* Injeção de dependência do ProfessorService */
  constructor(private professorSrv: ProfessorService) { }

  professores: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.professores = await this.professorSrv.listar();
      console.log(this.professores);
    }
    catch(erro) {
      console.error(erro);
    }
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')) {
      try {
        await this.professorSrv.excluir(id);
        this.ngOnInit(); // Força o recarregamento dos dados
        alert('Excluído com sucesso.');
      }
      catch(erro) {
        console.error(erro);
        alert('ERRO ao excluir.');
      }
    }
  }

}
