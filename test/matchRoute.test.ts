/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/matchRoute', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('matchRoute', async () => {
    const values_ = [
      '/',
      '/posts/140',
      '/blog/posts/140',
      '/tag/140',
      '/blog/tags/140',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '/',
        '/posts/140',
        '/blog/posts/140',
        '/tag/140',
        '/blog/tags/140',
      ];

      return values_.map(value => window.AmauiUtils.matchRoute([
        '/',
        '/blog/posts/:id',
        '/blog/tags/:id',
      ], value));
    }, { browsers });

    const valueNode = values_.map(value => AmauiUtils.matchRoute([
      '/',
      '/blog/posts/:id',
      '/blog/tags/:id',
    ], value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      false,
      true,
      false,
      true,
    ]));
  });

});
