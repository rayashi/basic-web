// spec.js
describe('Protractor para ', function() {
  it('Deve logar, carregar as terfas, e filtrar uma delas', function() {
    browser.get('http://localhost:4000');
    element(by.model('controller.user.username')).sendKeys('zup@zup.com');
    element(by.model('controller.user.password')).sendKeys('123');
    element(by.buttonText('Sign in')).click();
    expect(element(by.model('todo.text')));

    element(by.model('controller.query')).sendKeys('Estudar Angular');
    var todos = element.all(by.repeater('todo in controller.todos'));
    expect(todos.count()).toEqual(1);
  });
});