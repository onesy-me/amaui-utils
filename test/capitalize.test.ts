/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/capitalize', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('capitalize', async () => {
    const values_ = [
      'a',
      'a a A a',
      'A a',
      undefined,
      '',
      4,
      true,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        'a a A a',
        'A a',
        undefined,
        '',
        4,
        true,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.capitalize(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.capitalize(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'A',
      'A a A a',
      'A a',
      undefined,
      '',
      4,
      true,
      null,
      new Array(),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      const values_ = [
        'a',
      ];

      return values_.map((value: any) => value.capitalize());
    }, { browsers });

    AmauiUtils.polyfills();

    const values_ = [
      'a',
    ];

    const valueNode = values_.map((value: any) => value.capitalize());

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'A',
    ]));
  });

});
