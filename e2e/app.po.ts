import { browser, by, element } from 'protractor';

export class TwodegreePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root .container h1')).getText();
  }
}
