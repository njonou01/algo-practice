/**
 * Types pour Monaco Editor
 * Evite d'utiliser 'any' partout
 */

import type * as monacoEditor from 'monaco-editor';

export type Monaco = typeof monacoEditor;
export type IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
export type ITextModel = monacoEditor.editor.ITextModel;
export type IMonarchLanguage = monacoEditor.languages.IMonarchLanguage;
export type CompletionItemProvider = monacoEditor.languages.CompletionItemProvider;
export type CompletionItem = monacoEditor.languages.CompletionItem;
export type CompletionList = monacoEditor.languages.CompletionList;
export type Position = monacoEditor.Position;
export type IRange = monacoEditor.IRange;
