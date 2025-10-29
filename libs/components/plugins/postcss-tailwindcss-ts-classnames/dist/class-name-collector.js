/* eslint-env node */
'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClassNameCollector = void 0;
const postcss_selector_parser_1 = __importDefault(require('postcss-selector-parser'));
const fs_1 = require('fs');
const lodash_debounce_1 = __importDefault(require('lodash.debounce'));
class ClassNameCollector {
  constructor(options) {
    this.waiters = [];
    this.debouncedWrite = (0, lodash_debounce_1.default)(
      () =>
        __awaiter(this, void 0, void 0, function* () {
          if (this.dest) {
            yield fs_1.promises.writeFile(this.dest, this.getTypeScriptFileContent());
          }
          this.waiters.forEach((resolve) => resolve());
          this.waiters = [];
        }),
      100,
    );
    this.dest = options.dest;
    this.isModule = options.isModule;
    this.exportAsDefault = options.exportAsDefault;
    this.classNames = new Map();
  }
  waitForWrite() {
    return __awaiter(this, void 0, void 0, function () {
      return new Promise((resolve) => {
        this.waiters.push(resolve);
      });
    });
  }
  addClassName(file, className) {
    let classNames = this.classNames.get(file);
    if (!classNames) {
      classNames = new Set();
      this.classNames.set(file, classNames);
    }
    classNames.add(className);
    this.debouncedWrite();
  }
  getClassNames() {
    const allUniq = new Set();
    for (const names of Array.from(this.classNames.values())) {
      if (names) {
        names.forEach((n) => allUniq.add(n.replaceAll('\\', '')));
      }
    }
    return Array.from(allUniq).sort();
  }
  getTypeScriptFileContent() {
    const comment = '// This file is auto-generated with postcss-tailwindcss-ts-classnames.';
    const prefix = '  | ';
    const classNames = this.getClassNames();
    const allNames = classNames.map((n) => `"${n}"`).join(`\n${prefix}`);
    const textNames = classNames
      .filter((f) => f.includes('text-'))
      .map((n) => `"${n}"`)
      .join(`\n${prefix}`);
    const borderNames = classNames
      .filter((f) => f.includes('border-') || f === 'border')
      .map((n) => `"${n}"`)
      .join(`\n${prefix}`);
    const paddingNames = classNames
      .filter(
        (f) =>
          ((f.startsWith('p') && f.indexOf('-') < 3) ||
            (f.indexOf(':p') > 0 && f.indexOf(':p') < 5 && f.indexOf('-') - f.indexOf(':p') - 1 < 3)) &&
          f.indexOf('-') > 0,
      )
      .map((n) => `"${n}"`)
      .join(`\n${prefix}`);
    const positionNames = classNames
      .filter((f) => f.includes('left-') || f.includes('right-'))
      .map((n) => `"${n}"`)
      .join(`\n${prefix}`);
    let result = `${comment}\n\nexport type TAllClassNames =\n${prefix}${allNames};
\n\nexport type TTextClassNames =\n${prefix}${textNames};
\n\nexport type TBorderClassNames =\n${prefix}${borderNames};
\n\nexport type TPaddingClassNames =\n${prefix}${paddingNames};
\n\nexport type TPositionClassNames =\n${prefix}${positionNames};`;
    return result;
  }
  process(root) {
    console.log('TEST' + root.source.input.file);
    if (!root.source) {
      return;
    }
    const file = root.source.input.file;
    if (!file) {
      return;
    }
    // clear classes from previous file version
    this.classNames.delete(file);
    const parser = (0, postcss_selector_parser_1.default)((selectors) => {
      selectors.each((selector) => {
        if (selector.type !== 'selector') {
          return;
        }
        for (const node of selector.nodes) {
          if (node.type === 'class') {
            this.addClassName(file, node.toString().slice(1));
          }
        }
      });
    });
    root.walkRules((rule) => {
      parser.process(rule, { lossless: false });
    });
  }
}
exports.ClassNameCollector = ClassNameCollector;
//# sourceMappingURL=class-name-collector.js.map
