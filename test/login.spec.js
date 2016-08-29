describe('login', function () {
    it('should login to admin panel', function () {
        browser.get('#/login');
        expect(element(by.css('#loginBlock')).isPresent()).toBe(true);
        var username = element(by.model('user.username')),
            password = element(by.model('user.password')),
            submit = element(by.css('button'));
        username.isDisplayed().then(function () {
            username.sendKeys('admin');
        });
        password.isDisplayed().then(function () {
            password.sendKeys('1234');
        });
        submit.isDisplayed().then(function () {
            submit.click();
        });
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/admin/home');

    });
});