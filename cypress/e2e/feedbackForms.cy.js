describe('Feedback Form Tests', () => {
  beforeEach(() => {
    // Открываем страницу с формой
    cy.visit('https://kontaktnaya-forma.testograf.ru/?embedded=true&source=embed&referer=https%3A%2F%2Fwww.testograf.ru%2Fru%2Fblog%2Ffeedback-form-template');

    // Проверяем, что контейнер с формой виден
    cy.get('.survey').should('be.visible'); // Основной контейнер формы
  });

  it('should submit the form successfully with valid data', () => {
    // Поле "Ваше имя"
    cy.get('[class*="input textfield___c13e5c354deb256560e7"]')
      .find('input[class*="control___e16bbac759474cb49f55 transparent___ff454935e0e05f508992"]')
      .eq(0) // Выбираем первый элемент
      .type('Тестовый пользователь');

    // Поле "E-mail"
    cy.get('[class*="input textfield___c13e5c354deb256560e7"]')
      .find('input[class*="control___e16bbac759474cb49f55 transparent___ff454935e0e05f508992"]')
      .eq(1) // Выбираем второй элемент
      .type('testuser@example.com');

    // Поле "Телефон"
    cy.get('[class*="input textfield___c13e5c354deb256560e7"]')
      .find('input[class*="control___e16bbac759474cb49f55 transparent___ff454935e0e05f508992"]')
      .eq(2) // Выбираем третий элемент
      .type('+79111234567');

    // Выбор из динамически отображаемого списка (цель обращения)
    cy.get('[class*="title___bb675eac964120e07a92 searchable___f1c57fdf9d3d7789a720"]')
      .click(); // Кликаем на элемент "цель обращения", чтобы открыть список

    // Ждем появления списка и кликаем по нужному варианту
    cy.contains('Заказ').click(); // Выбираем пункт "Заказ"

    // Поле "Сообщение"
    cy.get('[class*="multiline___cc6bb61529c652f37050 control___e16bbac759474cb49f55 control___b7ae007d86d6ea2bb014 transparent___ff454935e0e05f508992"]')
      .type('Это тестовое сообщение.', { force: true }); // Вводим текст сообщения, игнорируя скрытые элементы

    // Кнопка отправки формы
    cy.get('button[type="button"]').first().click(); // Кликаем на первую кнопку

    // Проверяем сообщение об успешной отправке
    cy.contains('Благодарим за обращение!').should('be.visible');
  });
});