/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/darken', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('darken', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.41%, 50.4%, 0.4)',
      'rgb(174 214 a)',
      'a',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ff8c00',
        '#ff8c0070',
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.41%, 50.4%, 0.4)',
        'rgb(174 214 a)',
        'a',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.darken(value, .4));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.darken(value, .4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.44)',
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.44)',
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.4)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgba(255, 140, 0, 0.4)' as any).darken(.4),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgba(255, 140, 0, 0.4)' as any).darken(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(153, 84, 0, 0.4)',
    ]));
  });

});
