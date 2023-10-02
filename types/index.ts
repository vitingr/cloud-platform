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

export interface Popup {
  children: React.ReactNode;
  show: boolean | any;
  title: string;
  width: string;
  height: string;
}