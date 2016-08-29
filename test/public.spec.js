var protractor = require('protractor');

describe('homepage', function () {
    it('should load the public pages', function () {
        //homepage
        browser.get('#/home');
        expect(element(by.css('.contentPublic')).isPresent()).toBe(true);
        expect(element(by.id('imgHome')).isPresent()).toBe(true);

        //contact page
        element(by.css('.navbar-left li:nth-child(2) a')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/contact');
        expect(element(by.css('#map')).isPresent()).toBe(true);
        expect(element(by.css('.kontakt')).isPresent()).toBe(true);

        //menu and dailymenu page
        element(by.css('.navbar-right li:nth-child(1) a')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/menu');
        expect(element(by.id('dailyMenuBlock')).isPresent()).toBe(true);
        expect(element(by.id('menuBlock')).isPresent()).toBe(true);

        //table reservation page
        element(by.css('.navbar-right li:nth-child(2) a')).click();
        expect(element(by.css('form')).isPresent()).toBe(true);
        expect(element(by.css('.seatingChart')).isPresent()).toBe(true);
        //check form for table reservation
        Date.prototype.ddmmyyyy = function () {
            var dd = this.getDate();
            var mm = parseInt(this.getMonth())+1;
            var yyyy = this.getFullYear();
            if (mm<10) { return [dd, '.0', mm, '.', yyyy].join(''); }
            return [dd, '.', mm, '.', yyyy].join('');
        };

        var jmeno = element.all(by.model('reservation.jmeno')).get(0).sendKeys('Yuliya'),
            prijmeni = element.all(by.model('reservation.prijmeni')).get(0).sendKeys('Ovchinnikova'),
            tel = element.all(by.model('reservation.tel')).get(0).sendKeys('7777777'),
            email = element.all(by.model('reservation.email')).get(0).sendKeys('yuliya@email.com'),
            datum = element.all(by.model('reservation.datum')).get(0),
            today = new Date().ddmmyyyy(),
            cas = element.all(by.model('reservation.startTime')).get(0).sendKeys('18:00');
        expect(element(by.model('reservation.jmeno')).getAttribute('value').then(function (value) {
            expect(value).toEqual('Yuliya');
            }),
            element(by.model('reservation.prijmeni')).getAttribute('value').then(function (value) {
                expect(value).toEqual('Ovchinnikova');
            }),
            element(by.model('reservation.datum')).getAttribute('value').then(function (value) {
                expect(value).toEqual(today);
            }),
            element(by.model('reservation.tel')).getAttribute('value').then(function (value) {
                expect(value).toEqual('7777777');
            }),
            element(by.model('reservation.email')).getAttribute('value').then(function (value) {
                expect(value).toEqual('yuliya@email.com');
            }),
            element(by.model('reservation.startTime')).getAttribute('value').then(function (value) {
                expect(value).toEqual('18');
            }),
            element(by.model('reservation.endTime')).getAttribute('value').then(function (value) {
                expect(value).toEqual('19');
            }));
        //var table = element.all(by.css('input[type="checkbox"]')).get(9);
        var table = element.all(by.model('stul.checked'));
        table.map(function (elem) {
            elem.getAttribute('class').then(function (cl) {
                console.log(cl);
            });
        });
        //var oneT = table.get(10);
        //oneT.click();
        //var ptor = protractor.getInstance();
        /*var driver = ptor.driver;
        driver.executeScript('arguments[0].click()', oneT).then(function () {
            expect(whatever).toMatch(whatever);
        })
        /*.map(function (value) {
            value.getAttribute('value').then(function (v) {
                console.log(v);
            });
        });*/

        /*var el = element()
        var visTable = table.filter(function (elem) {
            return elem.isDisplayed();
        }).first();
        expect(visTable.isPresent()).toBe(true);
        if ()
        //browser.actions().mouseMove(table).click().perform();
        //expect(table.isSelected()).toBeTruthy();
        /*for (var i=0; i<tables.length; i++) {
            console.log('cyklus ', i);
            ch = tables.get(i).getAttribute('class').then(function (classes) {
                if (classes.indexOf('reserved') === -1) {
                    tables.get(i).click();
                    expect(tables.get(i).isSelected()).toBe(true);

                    return 0;
                }
                else if(classes.indexOf('reserved') > -1) {
                    console.log('yes');
                }
            });

        }*/
        //table.click();
        //expect(table.isSelected()).toBe(true);
        //browser.sleep(5500);
        //var element = driver.find_elements(:css, 'ul li:not(".reserved")')[0];
        //expect(element.all(by.css('.seatingChart > ul > li:not(".reserved")')).click());//.get(0).isPresent()).toBe(true);//.element(by.css('input[type="checkbox"]')).click();
        //element(by.css('.seatingChart ul li:not("reserved")')).getAttribute('checked').toBeTruthy();
    });
});
