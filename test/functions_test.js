
const functions = require('../src/functions/functions');

test('adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
});

test('future curve', async () => {
   let out = await functions.futCurve('','', '');
   expect(out).toBe('');
});
