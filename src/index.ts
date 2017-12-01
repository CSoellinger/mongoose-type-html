/// <reference types="dompurify" />

import { JSDOM } from 'jsdom';
import * as mongoose from 'mongoose';
import * as sanitizeHtml from 'sanitize-html';
import * as deepmerge from 'deepmerge';
import * as kindOf from 'kind-of';
import { SchemaHtml } from '../typings';

const createDOMPurify = require('dompurify');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const optionsDefault: SchemaHtml.Options = {
  dompurify: true,
  sanitizehtml: false
}

class Html extends mongoose.Schema.Types.String {
  static schemaName: string;

  private dompurify: SchemaHtml.DomPurifyConfig;

  private sanitizehtml: SchemaHtml.SanitizeHtmlConfig;

  constructor(key: string, options?: SchemaHtml.Options) {
    if (options && kindOf(options.dompurify) !== 'boolean' && kindOf(options.dompurify) !== 'object') {
      options.dompurify = true;
    }

    if (options && kindOf(options.sanitizehtml) !== 'boolean' && kindOf(options.sanitizehtml) !== 'object') {
      options.sanitizehtml = false;
    }

    const _options: SchemaHtml.Options = deepmerge(optionsDefault, options);

    super(key, _options);

    this.dompurify = <SchemaHtml.DomPurifyConfig>_options.dompurify;
    this.sanitizehtml = <SchemaHtml.SanitizeHtmlConfig>_options.sanitizehtml;
  }

  cast(v: any) {
    let _val: string = v;

    if (kindOf(this.dompurify) === 'boolean' || kindOf(this.dompurify) === 'object') {
      _val = DOMPurify.sanitize(_val, <{}>this.dompurify);
    }

    if (kindOf(this.sanitizehtml) === 'boolean' || kindOf(this.sanitizehtml) === 'object') {
      _val = sanitizeHtml(_val, <{}>this.sanitizehtml);
    }

    return _val;
  }
}

Html.schemaName = 'Html';

mongoose.SchemaTypes.Html = module.exports = Html;
mongoose.Schema.Types.Html = module.exports = Html;

export default Html;
