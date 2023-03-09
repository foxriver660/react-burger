export type TIngredientShortInfo = {
  readonly id: string;
  readonly type: string;
};

export type TIngredient = {
  readonly calories: number | undefined;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
 };
export type TIngredientNanoId = TIngredient & { readonly nanoid: string };

export type TUser = {
  readonly email: string;
  readonly name: string;
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
  total: number;
  totalToday: number;
};
export type TString = {
  [name: string]: number;
}