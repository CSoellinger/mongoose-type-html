/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { SchemaHtml } from '../typings';
declare class Html extends mongoose.Schema.Types.String {
    static schemaName: string;
    private dompurify;
    private sanitizehtml;
    constructor(key: string, options?: SchemaHtml.Options);
    cast(v: any): string;
}
export default Html;
