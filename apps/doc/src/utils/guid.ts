/**
 * Создание GUID формата "12345678-90AB-CDEF-1234-567890ABCDEF"
 * @returns GUID в виде строки
 */
export function createGuid(): string {
  function S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4() + S4()}-${S4()}-4${S4().substring(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
}
