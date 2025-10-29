export enum HintType {
  Error,
  Info,
}

export interface IBaseHintProps {
  type: HintType;
  textColor?: string;
}

export interface ButtonInfo {
  buttonText?: string;
  buttonClick?: () => void;
}

export interface IHint extends ButtonInfo {
  text: string;
}

export interface ITextButtonHintProps extends IBaseHintProps {
  hints: IHint[];
}

export interface IMaxProjectCapacityHintProps extends IBaseHintProps {
  text: string;
}
