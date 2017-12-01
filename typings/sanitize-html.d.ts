// @todo for the moment we redeclare it, but we should check how to use the @types/sanitize-html package here...
declare namespace sanitize {
  type Attributes = { [attr: string]: string };


  type Tag = { tagName: string; attribs: Attributes; text?: string; };


  type Transformer = (tagName: string, attribs: Attributes) => Tag;

  interface IFrame {
    tag: string;
    attribs: { [index: string]: string };
    text: string;
    tagPosition: number;
  }

  interface IOptions {
    allowedAttributes?: { [index: string]: string[] } | boolean;
    allowedClasses?: { [index: string]: string[] } | boolean;
    allowedSchemes?: string[] | boolean;
    allowedSchemesByTag?: { [index: string]: string[] } | boolean;
    allowProtocolRelative?: boolean;
    allowedTags?: string[] | boolean;
    exclusiveFilter?: (frame: IFrame) => boolean;
    nonTextTags?: string[];
    selfClosing?: string[];
    transformTags?: { [tagName: string]: string | Transformer };
  }
}
