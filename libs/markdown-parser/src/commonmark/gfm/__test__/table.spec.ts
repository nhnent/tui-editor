import { Parser } from '../../blocks';
import { GfmHtmlRenderer } from '../../render/gfm/html';
import { convertToArrayTree } from '../../__test__/helper.spec';
import { BlockNode, TableNode } from 'src/commonmark/node';
import { source } from 'common-tags';

const reader = new Parser();
const writer = new GfmHtmlRenderer();

// Shortcut function to prevent prettier from adding linebreak beetween nested arrays
const pos = (a: number, b: number, c: number, d: number) => [
  [a, b],
  [c, d]
];

describe('table', () => {
  it('basic', () => {
    const root = reader.parse('  a |  b\n --|---\nc | d|\n e');
    const result = convertToArrayTree(root, [
      'type',
      'sourcepos',
      'stringContent',
      'literal'
    ] as (keyof BlockNode)[]);

    expect(result).toEqual({
      type: 'document',
      sourcepos: pos(1, 1, 4, 2),
      children: [
        {
          type: 'table',
          sourcepos: pos(1, 3, 4, 2),
          children: [
            {
              type: 'tableHead',
              sourcepos: pos(1, 3, 2, 7),
              children: [
                {
                  type: 'tableRow',
                  sourcepos: pos(1, 3, 1, 8),
                  children: [
                    {
                      type: 'tableCell',
                      sourcepos: pos(1, 3, 1, 3),
                      children: [
                        {
                          type: 'text',
                          literal: 'a',
                          sourcepos: pos(1, 3, 1, 3)
                        }
                      ]
                    },
                    {
                      type: 'tableCell',
                      sourcepos: pos(1, 8, 1, 8),
                      children: [
                        {
                          type: 'text',
                          literal: 'b',
                          sourcepos: pos(1, 8, 1, 8)
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'tableDelimRow',
                  sourcepos: pos(2, 2, 2, 7),
                  children: [
                    {
                      type: 'tableDelimCell',
                      stringContent: '--',
                      sourcepos: pos(2, 2, 2, 3)
                    },
                    {
                      type: 'tableDelimCell',
                      stringContent: '---',
                      sourcepos: pos(2, 5, 2, 7)
                    }
                  ]
                }
              ]
            },
            {
              type: 'tableBody',
              sourcepos: pos(3, 1, 4, 2),
              children: [
                {
                  type: 'tableRow',
                  sourcepos: pos(3, 1, 3, 6),
                  children: [
                    {
                      type: 'tableCell',
                      sourcepos: pos(3, 1, 3, 1),
                      children: [
                        {
                          type: 'text',
                          literal: 'c',
                          sourcepos: pos(3, 1, 3, 1)
                        }
                      ]
                    },
                    {
                      type: 'tableCell',
                      sourcepos: pos(3, 5, 3, 5),
                      children: [
                        {
                          type: 'text',
                          literal: 'd',
                          sourcepos: pos(3, 5, 3, 5)
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'tableRow',
                  sourcepos: pos(4, 2, 4, 2),
                  children: [
                    {
                      type: 'tableCell',
                      sourcepos: pos(4, 2, 4, 2),
                      children: [
                        {
                          type: 'text',
                          literal: 'e',
                          sourcepos: pos(4, 2, 4, 2)
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    const html = writer.render(root);
    const output = source`
      <table>
      <thead>
      <tr>
      <th>a</th>
      <th>b</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>c</td>
      <td>d</td>
      </tr>
      <tr>
      <td>e</td>
      <td></td>
      </tr>
      </tbody>
      </table>
    `;
    expect(html).toBe(`${output}\n`);
  });

  it('with aligns', () => {
    const root = reader.parse('left | center | right\n:--- | :---: | ---:\na | b | c');
    const tableNode = root.firstChild as TableNode;

    expect(tableNode.columns).toEqual([{ align: 'left' }, { align: 'center' }, { align: 'right' }]);
  });

  it('with empty cells', () => {
    const input = source`
      | a |  |  |
      | - | - | - |
      |  | b |  |
      |  |  | c |
    `;
    const output = source`
      <table>
      <thead>
      <tr>
      <th>a</th>
      <th></th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td></td>
      <td>b</td>
      <td></td>
      </tr>
      <tr>
      <td></td>
      <td></td>
      <td>c</td>
      </tr>
      </tbody>
      </table>
    `;

    const root = reader.parse(input);
    const html = writer.render(root);
    expect(html).toBe(`${output}\n`);
  });
});

describe('GFM Exmaple', () => {
  const examples = [
    {
      no: 198,
      input: source`
        | foo | bar |
        | --- | --- |
        | baz | bim |
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>foo</th>
        <th>bar</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>baz</td>
        <td>bim</td>
        </tr>
        </tbody>
        </table>
      `
    },
    {
      no: 199,
      input: source`
        | abc | defghi |
        :-: | -----------:
        bar | baz
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th align="center">abc</th>
        <th align="right">defghi</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td align="center">bar</td>
        <td align="right">baz</td>
        </tr>
        </tbody>
        </table>
      `
    },
    {
      no: 200,
      input: source`
        | f\\|oo  |
        | ------ |
        | b \`\\|\` az |
        | b **\\|** im |
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>f|oo</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>b <code>|</code> az</td>
        </tr>
        <tr>
        <td>b <strong>|</strong> im</td>
        </tr>
        </tbody>
        </table>
      `
    },
    {
      no: 201,
      input: source`
        | abc | def |
        | --- | --- |
        | bar | baz |
        > bar
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>abc</th>
        <th>def</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>bar</td>
        <td>baz</td>
        </tr>
        </tbody>
        </table>
        <blockquote>
        <p>bar</p>
        </blockquote>
      `
    },
    {
      no: 202,
      input: source`
        | abc | def |
        | --- | --- |
        | bar | baz |
        bar

        bar
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>abc</th>
        <th>def</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>bar</td>
        <td>baz</td>
        </tr>
        <tr>
        <td>bar</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <p>bar</p>
      `
    },
    {
      no: 203,
      input: source`
        | abc | def |
        | --- |
        | bar |
      `,
      output: source`
        <p>| abc | def |
        | --- |
        | bar |</p>
      `
    },
    {
      no: 204,
      input: source`
        | abc | def |
        | --- | --- |
        | bar |
        | bar | baz | boo |
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>abc</th>
        <th>def</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>bar</td>
        <td></td>
        </tr>
        <tr>
        <td>bar</td>
        <td>baz</td>
        </tr>
        </tbody>
        </table>
      `
    },
    {
      no: 205,
      input: source`
        | abc | def |
        | --- | --- |
      `,
      output: source`
        <table>
        <thead>
        <tr>
        <th>abc</th>
        <th>def</th>
        </tr>
        </thead>
        </table>
      `
    }
  ];

  examples.forEach(({ no, input, output }) => {
    it(String(no), () => {
      const root = reader.parse(input);
      const html = writer.render(root);
      expect(html).toBe(`${output}\n`);
    });
  });
});
