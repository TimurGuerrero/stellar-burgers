describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('button', 'Добавить')
      .click();

    cy.contains('li', 'Биокотлета из марсианской Магнолии')
      .contains('button', 'Добавить')
      .click();

    cy.contains('button', 'Оформить заказ').closest('section').as('constructor');

    cy.get('@constructor').should(
      'contain',
      'Флюоресцентная булка R2-D3 (верх)'
    );
    cy.get('@constructor').should(
      'contain',
      'Флюоресцентная булка R2-D3 (низ)'
    );
    cy.get('@constructor').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('открывает модалку ингредиента и закрывает её', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('Флюоресцентная булка R2-D3')
      .click();

    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');

    // закрытие по крестику
    cy.get('#modals button').first().click();
    cy.contains('Детали ингредиента').should('not.exist');

    // снова открываем
    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('Флюоресцентная булка R2-D3')
      .click();

    cy.contains('Детали ингредиента').should('exist');

    // закрытие по оверлею
    cy.get('#modals').children().last().click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
  
  it('создаёт заказ, показывает номер и очищает конструктор', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('http://localhost:4000', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=Bearer%20test-access-token;path=/';
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('button', 'Добавить')
      .click();
    cy.contains('li', 'Биокотлета из марсианской Магнолии')
      .contains('button', 'Добавить')
      .click();

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrder');
    cy.contains('идентификатор заказа').should('exist');
    cy.contains('12345').should('exist');

    cy.get('#modals button').first().click();
    cy.contains('идентификатор заказа').should('not.exist');

    cy.contains('button', 'Оформить заказ').closest('section').as('constructor');
    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');

    cy.clearLocalStorage();
    cy.clearCookie('accessToken');
  });
});
