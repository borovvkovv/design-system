export enum SendNotifyStatuses {
  NotSend = 0,
  Sending = 10,
  Sent = 20,
  Error = 30,
}

export enum TagType {
  Success,
  Warning,
  Info,
  Error,
}

export const SendNotifyStatusesNamesMap: Record<SendNotifyStatuses, string> = {
  [SendNotifyStatuses.NotSend]: 'Показания не передавались',
  [SendNotifyStatuses.Sending]: 'В процессе',
  [SendNotifyStatuses.Sent]: 'Успешно',
  [SendNotifyStatuses.Error]: 'Ошибка',
};

export const SendNotifyStatusesColorMap: Record<SendNotifyStatuses, TagType | undefined> = {
  [SendNotifyStatuses.Sending]: TagType.Warning,
  [SendNotifyStatuses.Sent]: TagType.Success,
  [SendNotifyStatuses.NotSend]: TagType.Info,
  [SendNotifyStatuses.Error]: TagType.Error,
};

export interface IBaseTagProps {
  text: string;
  type: TagType | undefined;
}
