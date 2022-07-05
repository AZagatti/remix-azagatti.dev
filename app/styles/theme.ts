export const theme = {
  styles: {
    global: (props: any) => ({
      '.mdx-prose': {
        '--base00': props.colorMode === 'dark' ? '#011627' : '#f3f3f3',
        '--base01': props.colorMode === 'dark' ? '#2d2d2d' : '#e0e0e0',
        '--base02': props.colorMode === 'dark' ? '#424242' : '#d6d6d6',
        '--base03': props.colorMode === 'dark' ? '#637777' : '#989fb1',
        '--base04': props.colorMode === 'dark' ? '#555555' : '#969896',
        '--base05': props.colorMode === 'dark' ? '#d6deeb' : '#2e3039',
        '--base06': props.colorMode === 'dark' ? '#c8c8c8' : '#282a2e',
        '--base07': props.colorMode === 'dark' ? '#fafafa' : '#1d1f21',
        '--base08': props.colorMode === 'dark' ? '#d7dbe0' : '#403f53',
        '--base09': props.colorMode === 'dark' ? '#f78c6c' : '#aa0982',
        '--base0A': props.colorMode === 'dark' ? '#c792ea' : '#994cc3',
        '--base0B': props.colorMode === 'dark' ? '#ecc48d' : '#c96765',
        '--base0C': props.colorMode === 'dark' ? '#f78c6c' : '#aa0982',
        '--base0D': props.colorMode === 'dark' ? '#82aaff' : '#4876d6',
        '--base0E': props.colorMode === 'dark' ? '#c792ea' : '#994cc3',
        '--base0F': props.colorMode === 'dark' ? '#d3423e' : '#d3423e',
        pre: {
          position: 'relative',
          width: '100%',
          pb: '2',
          overflowX: 'auto',
        },
        h2: {
          fontFamily: 'var(--chakra-fonts-heading)',
          mt: '12',
          mb: '4',
          fontSize: '3xl',
          fontWeight: 'bold',
        },
        h3: {
          fontFamily: 'var(--chakra-fonts-heading)',
          mt: '12',
          mb: '4',
          fontSize: '2xl',
          fontWeight: 'bold',
        },
        p: {
          fontSize: 'md',
          lineHeight: '1.6',
          mb: '4',
        },
        div: {
          my: '4',
          display: 'grid',
        },
        hr: {
          mt: '8',
        },
        ul: {
          ml: '8',
        },
        li: {
          mb: '4',
        },
        a: {
          color: props.colorMode === 'dark' ? 'gray.200' : 'gray.900',
          textDecoration: 'underline',
        },
        'h2 a, h3 a, h4 a': {
          color: 'inherit',
          textDecoration: 'none',
        },
        code: {
          backgroundColor: 'var(--base00)',
          fontFamily: 'monospace',
        },
        'pre code': {
          backgroundColor: 'var(--base00)',
          fontSize: 'md',
          padding: '4',
          minWidth: '100%',
        },
        "pre[data-line-numbers='true']:not([data-lang='sh'])": {
          paddingLeft: '0rem',
          paddingRight: '0rem',
        },
        "pre[data-line-numbers='true']:not([data-lang='sh']) [data-line-number]:before":
          {
            paddingLeft: '0rem',
            content: 'attr(data-line-number)',
            textAlign: 'right',
            display: 'inline-block',
            maxWidth: '3.5rem',
            color: 'var(--base03)',
            paddingRight: '1.5rem',
            position: 'sticky',
            left: '0',
            backgroundColor: 'var(--base00)',
          },

        "pre[data-line-numbers='true']:not([data-lang='sh']) [data-line-number]:before .codeblock-line[data-highlight='true']:before":
          {
            background: 'var(--base0E)',
          },

        "pre[data-add]:not([data-lang='sh']) [data-diff-line-number]:before, pre[data-remove]:not([data-lang='sh']) [data-diff-line-number]:before":
          {
            content: 'attr(data-diff-line-number)',
          },

        'pre > code': {
          display: 'inline-block',
          minWidth: '100%',
        },

        '.codeblock-line': {
          display: 'block',
          position: 'relative',
          paddingRight: '1rem',
        },

        ".codeblock-line[data-highlight='true']:after, pre[data-remove] .codeblock-line[data-remove='true']:after, pre[data-add] .codeblock-line[data-add='true']:after":
          {
            content: "' '",
            position: 'absolute',
            left: '0',
            top: '0',
            maxWidth: '100%',
            opacity: '0.15',
            pointerEvents: 'none',
          },

        ".codeblock-line[data-highlight='true']:before": {
          borderLeft: '6px solid var(--base0E)',
        },

        ".codeblock-line[data-highlight='true']:after": {
          background: 'var(--base0E)',
        },

        "pre[data-remove] .codeblock-line[data-remove='true']:before": {
          content: "'-'",
        },

        "pre[data-remove] .codeblock-line[data-remove='true']:after": {
          background: 'var(--color-red-500)',
        },

        "pre[data-add] .codeblock-line[data-add='true']:before": {
          content: "'+'",
        },

        "pre[data-add] .codeblock-line[data-add='true']:after": {
          background: 'var(--color-green-500)',
        },

        'pre[data-filename]:before': {
          content: 'attr(data-filename)',
          position: 'absolute',
          left: '8px',
          top: '4px',
          fontSize: '0.7rem',
          opacity: '0.7',
        },

        'pre[data-lang]:after': {
          content: 'attr(data-lang)',
          position: 'sticky',
          right: '0',
          fontSize: '0.7rem',
          opacity: '0.7',
          display: 'inline-block',
          transform: 'translate(-16px, 24px)',
          textAlign: 'right',
          width: '200px',
          marginLeft: '-200px',
        },
      },
    }),
  },
  config: {
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Nunito', san-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    gray: {
      '50': '#F3F2F2',
      '100': '#DDD9D9',
      '200': '#C8C1C1',
      '300': '#B2A9A9',
      '400': '#9C9090',
      '500': '#877878',
      '600': '#6C6060',
      '700': '#514848',
      '800': '#363030',
      '900': '#1B1818',
    },
    red: {
      '50': '#FFE5E5',
      '100': '#FFB8B8',
      '200': '#FF8A8A',
      '300': '#FF5C5C',
      '400': '#FF2E2E',
      '500': '#FF0000',
      '600': '#CC0000',
      '700': '#990000',
      '800': '#660000',
      '900': '#330000',
    },
    blue: {
      '50': '#E8F3FC',
      '100': '#BFDCF8',
      '200': '#95C6F3',
      '300': '#6CB0EF',
      '400': '#439AEA',
      '500': '#1983E6',
      '600': '#1469B8',
      '700': '#0F4F8A',
      '800': '#0A345C',
      '900': '#051A2E',
    },
  },
}
