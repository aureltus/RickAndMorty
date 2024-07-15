describe('CharacterCardComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should display character details after drawing a character', () => {
    const character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    };

    // Mock the API response
    cy.intercept('GET', '**/character/*', {
      statusCode: 200,
      body: character,
    }).as('getCharacter');

    // Click the button to draw a character
    cy.get('button').contains('Draw a Character').click();

    // Wait for the API call to complete
    cy.wait('@getCharacter');

    // Check details
    cy.get('h2').should('contain.text', 'Rick Sanchez');
    cy.get('img').should('have.attr', 'src').should('include', character.image);
    cy.get('.details').should(
      'contain.text',
      'Status: Alive | Species: Human | Character ID: 1'
    );
  });
});

describe('Draw Button Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should display the draw button', () => {
    cy.get('button').contains('Draw a Character').should('be.visible');
  });

  it('should draw a character and display it', () => {
    cy.intercept('GET', '**/character/*', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    }).as('getCharacter');

    cy.get('button').contains('Draw a Character').click();

    cy.wait('@getCharacter');
    cy.get('h2').should('contain.text', 'Rick Sanchez');
    cy.get('img').should('have.attr', 'src').should('include', '1.jpeg');
    cy.get('.details').should(
      'contain.text',
      'Status: Alive | Species: Human | Character ID: 1'
    );
  });
});
