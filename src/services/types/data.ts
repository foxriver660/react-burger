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
  readonly email: string | undefined;
  readonly name: string | undefined;
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