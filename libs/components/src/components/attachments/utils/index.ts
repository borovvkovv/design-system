import { availableTypes, MAX_FILE_SIZE_MB, ErrorType } from './models';

export function removeFile(files: File[], file: File) {
  return files.filter((fileItem) => fileItem !== file);
}

export function getFileSize(file: File) {
  return getFileSizeString(file.size);
}

export function getFileSizeString(size: number) {
  if (size < 1024) {
    return `${size}Б`;
  }

  if (size < 1024 * 1024) {
    return `${parseFloat((size / 1024).toFixed(1))}Кб`;
  }

  return `${parseFloat((size / (1024 * 1024)).toFixed(1))}Мб`;
}

export function getFileName(file: File) {
  return getFileNameWithoutExtension(file.name);
}

export function getFileNameWithoutExtension(fileName: string) {
  return fileName.split('.').slice(0, -1).join('.');
}

export function getFileExtension(file: File) {
  return getFileExtensionByName(file.name);
}

export function getFileExtensionByName(fileName: string) {
  return fileName.split('.').pop()?.toUpperCase() ?? '';
}

export function checkFileType(file: File) {
  return availableTypes.includes(getFileExtension(file));
}

export function getFileErrors(file: File) {
  const errorTypes: ErrorType[] = [];

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    errorTypes.push(ErrorType.Size);
  }

  if (!checkFileType(file)) {
    errorTypes.push(ErrorType.Format);
  }

  return errorTypes;
}

export function getErrorText(errorType: ErrorType) {
  if (errorType === ErrorType.Format) {
    return `Для загрузки выберите файл с расширением: ${availableTypes.map((type) => type.toLowerCase()).join(', ')}`;
  }

  if (errorType === ErrorType.Size) {
    return `Максимальный размер файла: ${MAX_FILE_SIZE_MB} Mb`;
  }

  return '';
}

export function getFileUrl(file: File) {
  return window.URL.createObjectURL(file);
}
