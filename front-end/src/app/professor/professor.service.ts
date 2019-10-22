import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  /* Um objeto da classe HttpClient é injetado
    como dependência da classe ProfessorService.
    Isso é chamado INJEÇÃO DE DEPENDÊNCIA */
  constructor(private http: HttpClient) { 
    
  }

  private entryPoint : string = 'professor';

  listar() {
    // toPromise() permite que a chamada a esse método seja utilizada
    // com async/await
    return this.http.get(env.apiBaseUri + this.entryPoint).toPromise();
  }

  excluir(id: string) {
    return this.http.request('delete', env.apiBaseUri + this.entryPoint, 
      {body: {_id: id}}).toPromise();
  }

}
