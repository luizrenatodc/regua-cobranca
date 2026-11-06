import test from "node:test";
import assert from "node:assert/strict";
import { avisosDoDia, type Fatura } from "../src/regua.ts";

const f = (vencimento: string, paga = false): Fatura => ({ id: "F", cliente: "Ana", valor: 100, vencimento, paga });

test("escolhe a etapa pela distância do vencimento", () => {
  assert.equal(avisosDoDia([f("2030-01-13")], "2030-01-10", new Set())[0].etapa, "lembrete");
  assert.equal(avisosDoDia([f("2030-01-01")], "2030-01-11", new Set())[0].etapa, "negociacao");
});
test("ignora fatura paga e dia sem etapa", () => {
  assert.equal(avisosDoDia([f("2030-01-10", true)], "2030-01-10", new Set()).length, 0);
  assert.equal(avisosDoDia([f("2030-01-20")], "2030-01-10", new Set()).length, 0);
});
test("não repete aviso no mesmo dia", () => {
  const enviados = new Set<string>();
  assert.equal(avisosDoDia([f("2030-01-10")], "2030-01-10", enviados).length, 1);
  assert.equal(avisosDoDia([f("2030-01-10")], "2030-01-10", enviados).length, 0);
});
