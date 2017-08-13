import { TwodegreePage } from './app.po';

describe('twodegree App', () => {
  let page: TwodegreePage;

  beforeEach(() => {
    page = new TwodegreePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Unit Conversion tool');
  });
});
