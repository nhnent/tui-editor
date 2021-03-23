import { deepCopy, deepCopyArray, deepMergedCopy, includes } from '@/utils/common';

it('deepCopy', () => {
  const obj = { foo: 1, bar: { baz: 1 } };

  expect(deepCopy(obj)).toEqual(obj);
});

it('deepCopyArray', () => {
  const arr = [1, 2, ['a', 'b', ['c']], 3, 4];

  expect(deepCopyArray(arr)).toEqual(arr);
});

it('deepMergedCopy', () => {
  const obj1 = { a: 1, b: { c: 1, d: 'a', e: 'c', f: { g: 'd' } } };
  const obj2 = { a: 1, b: { c: 1, d: 'b', h: 'e' } };

  expect(deepMergedCopy(obj1, obj2)).toEqual({
    a: 1,
    b: { c: 1, d: 'b', e: 'c', f: { g: 'd' }, h: 'e' },
  });
});

it('includes', () => {
  expect(includes([1, 2, 3], 1)).toBe(true);
});
