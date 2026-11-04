import assert from 'node:assert/strict';
import { it } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { findTypography, Typography } from './Typography';
import { quickVariants, variants } from './variants';

it('preserves all valid quick and grouped variants, including empty styles', () => {
  for (const [name, classes] of Object.entries(quickVariants)) {
    assert.equal(findTypography(name), classes);
  }
  for (const [group, collection] of Object.entries(variants)) {
    for (const [name, classes] of Object.entries(collection)) {
      assert.equal(findTypography(name, group), classes);
    }
  }
  assert.equal(findTypography(), variants.paragraph.body);
});

it('logs invalid combinations and returns the simple paragraph fallback', (t) => {
  const log = t.mock.method(console, 'error', () => {});
  for (const [variant, group] of [
    ['missing', undefined],
    ['h2_base', undefined],
    ['body', 'missing'],
    ['h4', 'paragraph'],
    ['toString', undefined],
    ['body', '__proto__'],
  ]) {
    assert.equal(findTypography(variant, group), variants.paragraph.simple);
  }
  assert.equal(log.mock.callCount(), 6);
});

it('renders invalid combinations without throwing and preserves content and semantics', (t) => {
  const log = t.mock.method(console, 'error', () => {});
  const html = renderToStaticMarkup(
    createElement(
      Typography,
      {
        as: 'h3',
        variant: 'h4',
        group: 'paragraph',
      },
      'Still visible',
    ),
  );
  assert.match(html, /^<h3 /);
  assert.ok(html.includes(variants.paragraph.simple));
  assert.ok(html.includes('Still visible</h3>'));
  assert.equal(log.mock.callCount(), 1);
});
