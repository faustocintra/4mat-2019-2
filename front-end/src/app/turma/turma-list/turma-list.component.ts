import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../turma.service';
import { MatDialog } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.scss']
})
export class TurmaListComponent implements OnInit {

  /* Injeção de dependência do TurmaService */
  constructor(
    private turmaSrv: TurmaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  turmas: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'curso', 'professor', 'dia_semana', 'horario', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.turmas = await this.turmaSrv.listar();
      console.log(this.turmas);
    }
    catch(erro) {
      console.error(erro);
    }
  }

  async excluir(id: string) {
    try {
      const dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: {question: 'Deseja realmente excluir esta turma?'}
      });

      let result = await dialogRef.afterClosed().toPromise();
      
      if(result) {
        await this.turmaSrv.excluir(id);
        this.ngOnInit(); // Força o recarregamento dos dados
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', {
          duration: 4000,
        });            
      }

    } 
    catch(error) {
      console.error(error);
      this.snackBar.open('ERRO: não foi possível excluir. Entre em contato com o suporte técnico.', 'Entendi', {
        duration: 4000,
      });
    }
  }

}
