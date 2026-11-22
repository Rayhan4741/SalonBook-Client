export function testDateHelper() {
  const isPast = (dateStr: string) => new Date(dateStr).getTime() < new Date().setHours(0,0,0,0);
  const assert = (a: boolean, msg: string) => { if (!a) throw new Error(msg); };
  assert(isPast('2020-01-01') === true, '2020 should be past');
  assert(isPast('2099-01-01') === false, '2099 should not be past');
  return true;
}
