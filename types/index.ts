export interface Button {
  btnClass?: string;
  text: string;
  onClick?: () => void;
}

export interface GoogleAuth {
  clientId: string;
  clientSecret: string;
}

export interface ArrayType {
  map?: Function;
}