/* eslint-env node */
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createPlugin = exports.getSingleton = void 0;
const class_name_collector_1 = require('./class-name-collector');
function getSingleton() {
  const key = 'ts-classname-collector';
  const anyGlobal = global;
  let instance = anyGlobal[key];
  if (!instance) {
    instance = anyGlobal[key] = new class_name_collector_1.ClassNameCollector({
      dest: 'src/classnames.d.ts',
    });
  }
  return instance;
}
exports.getSingleton = getSingleton;
function createPlugin(collector) {
  const plugin = (userOptions) => {
    if (userOptions === null || userOptions === void 0 ? void 0 : userOptions.dest) {
      collector.dest = userOptions.dest;
    }
    return {
      postcssPlugin: 'postcss-tailwindcss-ts-classnames',
      Once(root) {
        collector.process(root);
      },
    };
  };
  plugin.postcss = true;
  return plugin;
}
exports.createPlugin = createPlugin;
exports.default = createPlugin(getSingleton());
//# sourceMappingURL=plugin.js.map
