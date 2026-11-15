import { describe, expect, it } from 'vitest';
import { sha256, sha256Manual } from './sha256';

const bytes = (texto) => new TextEncoder().encode(texto);

describe('sha256', () => {
  it('calcula igual aos valores de referência', () => {
    expect(sha256Manual(bytes(''))).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    expect(sha256Manual(bytes('abc'))).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('dá o mesmo resultado com ou sem o crypto do navegador (textos de vários tamanhos)', async () => {
    for (const texto of ['ESP-7KQ2-M9XA:52998224725', 'á'.repeat(40), 'x'.repeat(200)]) {
      expect(sha256Manual(bytes(texto))).toBe(await sha256(texto));
    }
  });
});
