// Monta os avisos de cobrança do dia. Rodar duas vezes no mesmo dia não duplica envio.
export type Fatura = { id: string; cliente: string; valor: number; vencimento: string; paga: boolean };
export type Aviso = { fatura: string; etapa: string; mensagem: string };

export const ETAPAS = [
  { dias: -3, nome: "lembrete", texto: "vence em 3 dias" },
  { dias: 0, nome: "vencimento", texto: "vence hoje" },
  { dias: 3, nome: "atraso", texto: "está 3 dias em atraso" },
  { dias: 10, nome: "negociacao", texto: "está 10 dias em atraso. Vamos negociar?" },
];

const moeda = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const diasEntre = (de: string, ate: string) => Math.round((Date.parse(ate) - Date.parse(de)) / 86400000);

export function avisosDoDia(faturas: Fatura[], hoje: string, enviados: Set<string>): Aviso[] {
  const saida: Aviso[] = [];
  for (const f of faturas) {
    if (f.paga) continue;
    const etapa = ETAPAS.find((e) => e.dias === diasEntre(f.vencimento, hoje));
    if (!etapa) continue;
    const chave = `${f.id}:${etapa.nome}`;
    if (enviados.has(chave)) continue;
    enviados.add(chave);
    saida.push({ fatura: f.id, etapa: etapa.nome, mensagem: `Olá, ${f.cliente}! Sua fatura de ${moeda(f.valor)} ${etapa.texto}.` });
  }
  return saida;
}
