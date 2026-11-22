import { testPriceHelper } from './priceHelper.test';
import { testDateHelper } from './dateHelper.test';
import { testReceiptHelper } from './receipt.test';
import { testValidationHelper } from './validation.test';
import { testAuthGuard } from './authGuard.test';

export function runAllClientTests() {
  console.log('🧪 RUNNING SALONBOOK CLIENT TESTS 🧪');
  const suite = [
    { name: 'priceHelper', fn: testPriceHelper },
    { name: 'dateHelper', fn: testDateHelper },
    { name: 'receiptHelper', fn: testReceiptHelper },
    { name: 'validationHelper', fn: testValidationHelper },
    { name: 'authGuard', fn: testAuthGuard },
  ];
  let pass = 0;
  for (const t of suite) {
    if (t.fn()) {
      console.log('✅ ' + t.name + ' PASSED');
      pass++;
    }
  }
  console.log('Completed: ' + pass + '/' + suite.length + ' passed');
  return pass === suite.length;
}

if (require.main === module) {
  runAllClientTests();
}
