/// <reference path="./sanitize-html.d.ts" />
/// <reference types="DOMPurify" />

export namespace SchemaHtml {
  type Options = {
    sanitizehtml: OptionsSanitizeHtml,
    dompurify: OptionsDomPurify
  };

  type OptionsSanitizeHtml = SanitizeHtmlConfig | null | undefined;

  type OptionsDomPurify = DomPurifyConfig | null | undefined;

  type SanitizeHtmlConfig = boolean | sanitize.IOptions;

  type DomPurifyConfig = boolean | DOMPurify.Config
}
