import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupplyService } from '../services/supply.service';
import { Supply } from '../model/supply.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-supply-add',
  templateUrl: './supply-add.component.html',
  styleUrls: ['./supply-add.component.scss'],
})
export class SupplyAddComponent {
  abastecimentos: Supply[] = [];
  erroAdicionarAbastecimento: string | null = null;
  novoAbastecimento: Supply = {
    id: 0,
    dataHora: new Date().toISOString(), // Formate a data como string no formato ISO 8601
    placaVeiculo: '',
    quilometragem: 0,
    valorTotal: 0,
  };

  colunas: string[] = [
    'dataHora',
    'placaVeiculo',
    'quilometragem',
    'valorTotal',
  ];

  dataSelecionada: Date = new Date();
  horaSelecionada: string = '';
  // Propriedade para armazenar a data selecionada no formato de string
  dataSelecionadaString: string = this.dataSelecionada.toLocaleDateString('pt-BR');

  constructor(private supplyService: SupplyService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listarAbastecimentos();
  }

  getPlaceholder(): string {
    return this.novoAbastecimento.quilometragem === 0 ? 'Quilometragem' : '';
  }

  listarAbastecimentos(): void {
    this.supplyService.listarAbastecimentos().subscribe((abastecimentos) => {
      this.abastecimentos = abastecimentos.map(abastecimento => {
        // Converte a dataHora para o formato ISO 8601 diretamente
        const dataHoraFormatted = new Date(abastecimento.dataHora).toISOString();

        return {
          ...abastecimento,
          dataHora: dataHoraFormatted,
        };
      });
    });
  }

  adicionarAbastecimento(): void {
    const [hours, minutes] = this.horaSelecionada.split(':');
    const dataHoraFormatted = new Date(this.dataSelecionada);
    dataHoraFormatted.setHours(Number(hours), Number(minutes));

    const abastecimentoEnviar: Supply = {
      id: this.novoAbastecimento.id,
      dataHora: dataHoraFormatted.toISOString(),
      placaVeiculo: this.novoAbastecimento.placaVeiculo,
      quilometragem: this.novoAbastecimento.quilometragem,
      valorTotal: this.novoAbastecimento.valorTotal,
    };

    this.supplyService.adicionarAbastecimento(abastecimentoEnviar).subscribe(
      () => {
        this.listarAbastecimentos();
        this.cd.detectChanges();
        window.location.reload();
      },
      () => {
        this.erroAdicionarAbastecimento = 'A quilometragem deve ser maior que a do abastecimento anterior.';
      }
    );
  }



  atualizarDataSelecionadaString(): void {
    const dia = this.dataSelecionada.getDate();
    const mes = this.dataSelecionada.getMonth() + 1; // Os meses em JavaScript são base 0
    const ano = this.dataSelecionada.getFullYear();

    this.dataSelecionadaString = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;
  }
}
