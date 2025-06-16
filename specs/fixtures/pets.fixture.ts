// specs/fixtures/pets.fixture.ts

// specs/fixtures/pets.fixture.ts


interface Pet {
  id: number;
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: 'available' | 'pending' | 'sold';
}
// specs/fixtures/pets.fixture.ts

export function createPetPayload(): Pet {
  return {
    id: Date.now(),              // o Number(uuidv4()) si quieres un número único
    category: { id: 1, name: 'dogs' },
    name: 'Fido',
    photoUrls: ['https://…'],
    tags: [{ id: 1, name: 'friendly' }],
    status: 'available'
  };
}