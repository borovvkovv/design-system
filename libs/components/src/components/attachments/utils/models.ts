export const MAX_FILE_SIZE_MB = 10;

export const MAX_FILES_WRAPPED = 3;

export const MAX_FILES = 6;

export const availableTypes = ['PDF', 'PNG', 'XLS', 'XLSX'];

export enum ErrorType {
  Format = 'Format',
  Size = 'Size',
}

export interface IErrorInfo {
  isActive: boolean;
  text: string;
}

export type Errors = Record<ErrorType, IErrorInfo>;
