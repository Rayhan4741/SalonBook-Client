export function testPriceHelper() {
  const format = (cents: number) => '$' + (cents / 100).toFixed(2);
  const assert = (a: boolean, msg: string) => { if (!a) throw new Error(msg); };
  assert(format(5000) === '$50.00', '5000 cents should be $50.00');
  assert(format(12550) === '$125.50', '12550 cents should be $125.50');
  assert(format(0) === '$0.00', '0 cents should be $0.00');
  return true;
}
