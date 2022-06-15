/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/countries', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('Serbia', async () => {
    const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.countries.find(country => country['alpha-2'] === 'RS'), { browsers });
    const valueNode = AmauiUtils.countries.find(country => country['alpha-2'] === 'RS');
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql({
      'flag': '🇷🇸',
      'name': 'Serbia',
      'full_name': 'The Republic of Serbia',
      'sovereignty': 'UN member state',
      'alpha-2': 'RS',
      'alpha-3': 'SRB',
      'numeric': '688',
      'subdivision': 'ISO 3166-2:RS',
      'tlds': [
        'rs'
      ],
    }));
  });

});
