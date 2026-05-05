import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../utils/formatter'; // ajuste o caminho conforme sua estrutura

describe('formatCurrency', () => {
  
  // Testes de Sucesso
  describe('Sucesso', () => {
    it('deve formatar um valor positivo para BRL por padrão', () => {
      const result = formatCurrency(1000.50);
      // Usamos regex ou replace para ignorar espaços inseparáveis (\u00a0) que o Intl gera
      expect(result.replace(/\u00a0/g, ' ')).toContain('R$ 1.000,50');
    });

    it('deve formatar corretamente para outra moeda (USD)', () => {
      const result = formatCurrency(100, 'USD');
      // O Intl com locale padrão (pt-BR) formatará como "US$ 100,00"
      expect(result.replace(/\u00a0/g, ' ')).toContain('US$ 100,00');
    });

    it('deve formatar zero corretamente', () => {
      const result = formatCurrency(0);
      expect(result.replace(/\u00a0/g, ' ')).toContain('R$ 0,00');
    });

    it('deve formatar valores negativos', () => {
      const result = formatCurrency(-50);
      expect(result.replace(/\u00a0/g, ' ')).toContain('-R$ 50,00');
    });
  });

  // Testes de Exceção
  describe('Exceções', () => {
    it('deve lançar TypeError se o valor for uma string', () => {
      expect(() => formatCurrency('100')).toThrow(TypeError);
      expect(() => formatCurrency('100')).toThrow('O valor deve ser um número.');
    });

    it('deve lançar TypeError se o valor for NaN', () => {
      expect(() => formatCurrency(NaN)).toThrow(TypeError);
    });

    it('deve lançar TypeError se o valor for undefined ou null', () => {
      expect(() => formatCurrency(undefined)).toThrow(TypeError);
      expect(() => formatCurrency(null)).toThrow(TypeError);
    });

    it('deve lançar RangeError se a moeda for inválida', () => {
      // O Intl lança RangeError internamente para códigos de moeda mal formatados
      expect(() => formatCurrency(100, '123')).toThrow(RangeError);
    });
  });
});