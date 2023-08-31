import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SupplyService } from '../services/supply.service';
import { Supply } from '../model/supply.model';

@Component({
  selector: 'app-list-supply',
  templateUrl: './list-supply.component.html',
  styleUrls: ['./list-supply.component.scss']
})
export class ListSupplyComponent {
  abastecimentos: any[] = [];
  filtroVeiculo: string = '';
  abastecimentosFiltrados: Supply[] = [];
  veiculosUnicos: string[] = []; // Array para armazenar veículos únicos
  excluirAbastecimentoSelecionado: Supply | null = null;
  exibirModalConfirmacao: boolean = false;

  constructor(private supplyService: SupplyService, private cd: ChangeDetectorRef) {}

  colunas: string[] = [
    'dataHora',
    'placaVeiculo',
    'quilometragem',
    'valorTotal',
  ];

  ngOnInit(): void {
    this.supplyService.listarAbastecimentos().subscribe((abastecimentos) => {
      this.abastecimentos = abastecimentos.map(abastecimento => {
        // Converte a dataHora para o formato ISO 8601 diretamente
        const dataHoraFormatted = new Date(abastecimento.dataHora).toISOString();

        return {
          ...abastecimento,
          dataHora: dataHoraFormatted,
        };
      });

      // Obter valores únicos dos veículos
      this.veiculosUnicos = Array.from(new Set(this.abastecimentos.map(abastecimento => abastecimento.placaVeiculo)));

      this.aplicarFiltro(); // Aplicar filtro ao inicializar
    });
  }

  aplicarFiltro() {
    if (this.filtroVeiculo === '') {
      this.abastecimentosFiltrados = this.abastecimentos;
    } else {
      this.abastecimentosFiltrados = this.abastecimentos.filter(abastecimento =>
        abastecimento.placaVeiculo === this.filtroVeiculo
      );
    }
  }

  limparFiltro() {
    this.filtroVeiculo = '';
  }

  confirmarExclusao(): void {
    if (this.excluirAbastecimentoSelecionado) {
      this.supplyService.removerAbastecimento(this.excluirAbastecimentoSelecionado.id).subscribe(() => {
        console.log("Abastecimento removido com sucesso!");

        const index = this.abastecimentos.indexOf(this.excluirAbastecimentoSelecionado);
        if (index !== -1) {
          this.abastecimentos.splice(index, 1);
          window.location.reload();
          console.log("Abastecimento removido da lista local.");
        } else {
          console.log("Erro ao remover abastecimento da lista local. Índice não encontrado.");
        }

        this.exibirModalConfirmacao = false;
      });
    }
  }

  cancelarExclusao(): void {
    this.exibirModalConfirmacao = false;
  }
  exibirModalDeConfirmacao(abastecimento: Supply): void {
    this.excluirAbastecimentoSelecionado = abastecimento;
    this.exibirModalConfirmacao = true;
  }
}
