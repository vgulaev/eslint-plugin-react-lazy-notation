const esquery = require("esquery")

const transormLine = line => {
  const parts = line.split(' ')
  return `const ${parts[1]} = lazy(() => import(${parts[3]}))`
}

module.exports = {
  rules: {
    "react-lazy-notation": {
      meta: {
        docs: {
          description: "check lazy notation",
          category: "Possible Errors",
          recommended: true,
          url: "https://github.com/vgulaev/eslint-plugin-react-lazy-notation"
        },
        fixable: "code",
      },
      create: (context) => {
        const sourceCode = context.getSourceCode()
        const allTags = {}
        esquery(sourceCode.ast, 'JSXOpeningElement')
          .forEach(node => {
            if (node.name.name in allTags) return;
            allTags[node.name.name] = node
          })
        const reactTags = new Set(Object.keys(allTags).filter(tag => tag[0] == tag[0].toUpperCase()))

        return {
          ImportDeclaration(node) {
            const first = node.specifiers?.[0]
            if (first &&
              1 == node.specifiers.length &&
              'ImportDefaultSpecifier' == first.type &&
              reactTags.has(first.local.name)) {
              context.report({
                node: node,
                message: "{{ identifier }} can replase with lazy notation",
                data: {
                  identifier: first.local.name
                },
                fix: function (fixer) {
                  return fixer.replaceText(node, transormLine(sourceCode.getText(node)))
                }
              })
            }
          },
        }
      }
    }
  }
};
