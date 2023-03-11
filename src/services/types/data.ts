import { ChangeEvent, FormEvent, ReactNode } from "react";

// ВСПОМОГАТЕЛЬНАЯ ТИПИЗАЦИЯ
export type TIngredientShortInfo = {
  readonly id: string;
  readonly type: string;
};
export type TIngredient = {
  calories: number | undefined;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
 nanoid?: string;
};

export type TUser = {
  readonly email?: string;
  readonly name?: string;
};
export type TUserInfo = TUser & { readonly password: string };
export type TUserLogin = Omit<TUser, "name"> & { readonly password: string };

export type TOrder = {
  createdAt: string;
  ingredients: ReadonlyArray<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};
export type TAllOrders = {
  orders: ReadonlyArray<TOrder>;
  total?: number;
  totalToday?: number;
};
export type TString = {
  [key: string]: number;
};
export type TToken = {
  [key: string]: string | undefined;
}

export type TActions = {
  wsConnectionStart: (payload: string)=> {type: string; payload: string};
  wsDisconnect: ()=> {type: string};
  wsConnectionSuccess: ()=> {type: string};
  wsConnectionClosed: ()=> {type: String};
  wsConnectionError: ()=> {type: string};
  wsGetMessage: (payload: TAllOrders)=> {type: string; payload: TAllOrders};
  wsConnectionFailed: ()=> {type: string};
}
// ТИПИЗАЦИЯ КОМПОНЕНТОВ
export type TOrderBox = {
  doneOrder: number[];
};

export type TIngredientItem = {
  ingredient: TIngredient;
  quantityIngredients: TString;
};
export type TImageCicle = {
  src: string;
  index?: number;
  rest?: number;
};
export type TModalOverlay = {
  onClose: () => void;
  children: ReactNode;
};
export type TModal = {
  children: ReactNode;
  onClose?: () => void;
  type: string;
};
export type TLoader = {
  classname: string | undefined;
};
export type TIngredientsCategory = {
  filteredArr: TIngredient[];
};
export type TIngredientCard = {
  data: TIngredient;
};
export type TCompoundItem ={
  type: string;
  quantity: number;
}
export type TFormOverlay = {
  children: ReactNode;
  type: string;
}
export type TForm = {
  children: ReactNode;
  formName: string;
  onSubmit: (e: FormEvent) => void;
  mainForm: boolean;
}
export type TOrderFeed = {
  order: TOrder;
  type: string;
}
export type TInputCode = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export type TInput = {
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
export type TConstructorList={
  value: TIngredient
}
// ТИПИЗАЦИЯ СТРАНИЦ
export type TOrderDetailPage ={
  source: string;
}