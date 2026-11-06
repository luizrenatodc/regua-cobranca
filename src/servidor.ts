// Execução de exemplo: node src/servidor.ts 2030-01-10
import { avisosDoDia, type Fatura } from "./regua.ts";

const faturas: Fatura[] = [
  { id: "F1", cliente: "Ana", valor: 250, vencimento: "2030-01-13", paga: false },
  { id: "F2", cliente: "Bruno", valor: 90.5, vencimento: "2030-01-10", paga: false },
  { id: "F3", cliente: "Carla", valor: 400, vencimento: "2030-01-07", paga: true },
];
const hoje = process.argv[2] ?? new Date().toISOString().slice(0, 10);
for (const a of avisosDoDia(faturas, hoje, new Set())) console.log(`[${a.etapa}] ${a.mensagem}`);
