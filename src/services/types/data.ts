import { ChangeEvent, FormEvent, ReactNode } from "react";

// ВСПОМОГАТЕЛЬНАЯ ТИПИЗАЦИЯ
export type THeadersApi = {
  method?: string;
  headers: {[key: string]: string;}
  body?: string
}
export type TResApi = {
  success: boolean;
  [key: string]: any
}
export type TIngredientShortInfo = {
  readonly id: string;
  readonly type: string;
};
export type TIngredient = {
  calories: number;
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
export type TIngredientConst = {
  readonly calories?: number;
  readonly carbohydrates?: number;
  readonly fat?: number;
  readonly image?: string;
  readonly image_large?: string;
  readonly image_mobile?: string;
  readonly name?: string;
  readonly price?: number;
  readonly proteins?: number;
  readonly type?: string;
  readonly __v?: number;
  readonly _id?: string;
  readonly nanoid: string;
};
export type TUser = {
  readonly email: string;
  readonly name?: string;
  readonly password?: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};
export type TAllOrders = {
  orders: TOrder[];
  total?: number;
  totalToday?: number;
};
export type TObjectNumber = {
  [key: string]: number;
};
export type TObjectString = {
  [key: string]: string;
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
export type TProtectedRoute = {
  element: ReactNode;
  onlyUnAuth?: boolean;
}
export type TOrderBox = {
  doneOrder: number[];
};

export type TIngredientItem = {
  ingredient: TIngredient;
  quantityIngredients: TObjectNumber;
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
  profile?: boolean
}
export type TConstructorList={
  value: TIngredient
}
// ТИПИЗАЦИЯ СТРАНИЦ
export type TOrderDetailPage ={
  source: string;
}
// ТИПИЗАЦИЯ API
export type TLoginApi = {
  email: string;
  password: string;
}
export type TGetOrderAPI = Array<string | undefined> 

export type TUpdatePassRequestAPI = string 
export type TUpdatePassRequestFormAPI = { email: string }
export type TResetPassAPI = {
  password: string;
  token: string;
}
export type TRegisterUserAPI = {
  name: string;
  email: string;
  password: string;
}