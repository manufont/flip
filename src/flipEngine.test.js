import flipEngine from './flipEngine';

const moneyRound = n => (
  Math.ceil(n*100)/100
)

describe('flipEngine', () => {

  let spent;
  let payed;

  const exec = getAmountSpentByA => {
    for(let i=0; i<1E4; ++i){
      const amountSpentByB = moneyRound(Math.random()*30)
      const amountSpentByA = getAmountSpentByA(amountSpentByB);
      const totalAmount = amountSpentByA + amountSpentByB;
      spent.A += amountSpentByA;
      spent.B += amountSpentByB;
      const p = flipEngine(totalAmount, amountSpentByA);
      const head = Math.random() < p;
      payed[head ? 'A' : 'B'] += totalAmount;
    }
  }

  const expectSpentEqualsPayed = () => {
    expect(spent.A + spent.B).toBeCloseTo(payed.A + payed.B);
    expect(spent.A / payed.A).toBeGreaterThan(0.95);
    expect(spent.A / payed.A).toBeLessThan(1.05);
  }

  beforeEach(() => {
    spent = { A: 0, B: 0};
    payed = { A: 0, B: 0};
  })

  test('A spend 2 times more than B', () => {
    exec(amountSpentByB => 2 * amountSpentByB);
    expectSpentEqualsPayed();
  });
  
  test('A spend 1.5 times less than B', () => {
    exec(amountSpentByB => amountSpentByB / 1.5);
    expectSpentEqualsPayed();
  });
  
  test('A spend the same amount than B', () => {
    exec(amountSpentByB => amountSpentByB);
    expectSpentEqualsPayed();
  });

})
