// Mock data is used from Draftbit's https://example-data.draftbit.com/books

export const booksData = {
  title: 'The Hunger Games',
  description:
    'Winning will make you famous. Losing means certain death.The nation of Panem',
};

export const DATA = [
  {
    id: 1,
    description: 'Test 1',
  },
  {
    id: 2,
    description: 'Test 2',
  },
  {
    id: 3,
    description: 'Test 3',
  },
  {
    id: 4,
    description: 'Test 4',
  },
  {
    id: 5,
    description: 'Test 5',
  },
  {
    id: 6,
    description: 'Test 6',
  },
  {
    id: 7,
    description: 'Test 7',
  },
  {
    id: 8,
    description: 'Test 8',
  },
  {
    id: 9,
    description: 'Test 9',
  },
  {
    id: 10,
    description: 'Test 10',
  },
  {
    id: 11,
    description: 'Test 11',
  },
  {
    id: 12,
    description: 'Test 12',
  },
  {
    id: 13,
    description: 'Test 13',
  },
  {
    id: 14,
    description: 'Test 14',
  },
];

export function splitArrayIntoChunks(array: any[], numberOfArrays: number = 2) {
  const chunkSize = Math.ceil(array.length / numberOfArrays);
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
