import React, { FC, useEffect, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  InfoIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { OrderСompletedModal, Modal, ConstructorList } from "../index";
import { useDrop } from "react-dnd";
import { BUN, PATH, WS_URL } from "../../utils/constant";
import {
  addIngredient,
  addBun,
  sortIngredient,
  resetConstructor,
} from "../../services/actions/ingredientActions";
import { resetOrder, getApiOrder } from "../../services/actions/orderActions";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  wsDisconnect,
  wsConnectionStart,
  wsResetMessage,
} from "../../services/actions/wsActions";
import {
  getSuccessTokenUpdate,
  getIngredients,
  getBun,
  getOrderRequestFailed,
  getAuthUser,
  getWsConnectedFailed,
} from "../../selectors/selectors";
import { TIngredient } from "../../services/types/data";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import useIngredientsOperations from "../../hooks/useIngredientsOperations";
import { getCookie } from "../../utils/cookie";

const BurgerConstructor: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { calcTotalPrice } = useIngredientsOperations();
    // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const ingredients = useAppSelector(getIngredients);
  const bun = useAppSelector(getBun);
  const authUser = useAppSelector(getAuthUser);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);
  const orderRequestFailed = useAppSelector(getOrderRequestFailed);
  const wsConnectedFailed = useAppSelector(getWsConnectedFailed);
  const WS_URL_HISTORY = `${WS_URL}?token=${getCookie("token")}`;
  let totalCost = calcTotalPrice([bun as TIngredient, ...ingredients]);

  // НАПРАВЛЯЕМ ID НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ORDER
  const handleClickOrder = () => {
    const ingredientsId = [
      ...ingredients.map((item: TIngredient) => item._id),
      bun?._id,
    ];
    if (authUser) {
      
      dispatch(wsResetMessage());
      dispatch(getApiOrder(ingredientsId));
      dispatch(wsConnectionStart(WS_URL_HISTORY));
      setOpen(true);
    } else {
      navigate(PATH.LOGIN);
    }
  };
  // ПРЕДОХРАНИТЕЛЬ НА СЛУЧАЙ ИСТЕЧЕНИЯ СРОКА ***accessToken***
  useEffect(() => {
    const ingredientsId = [
      ...ingredients.map((item: TIngredient) => item._id),
      bun?._id,
    ];
    if (successTokenUpdate && (orderRequestFailed || wsConnectedFailed)) {
      dispatch(getApiOrder(ingredientsId));
      dispatch(wsConnectionStart(WS_URL_HISTORY));
    }
  }, [successTokenUpdate, orderRequestFailed, wsConnectedFailed]); // eslint-disable-line

  // !DRAG AND DROP
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: "items",
    drop: (item: { id: string; type: string }) => {
      item.type === BUN
        ? dispatch(addBun(item))
        : dispatch(addIngredient(item));
         },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let outline = "none";
  if (isActive) {
    outline = "3px solid var(--color-done)";
  } else if (canDrop) {
    outline = "1px solid var(--color-red)";
  }

  // ИНСТРУМЕНТЫ ДЛЯ УСЛОВНОГО РЕНДЕРИНГА
  const checkIngredient = ingredients.length > 0;
  const checkBun = !!bun?.type;
  const errorMessage = (message: string) => {
    return (
      <span
        className={`${classes.defaultMessage} text text_type_main-default pt-1`}
      >
        <InfoIcon type={isActive ? "success" : "error"} /> {message}{" "}
      </span>
    );
  };

  return (
    <section
      ref={dropRef}
      style={{ outline }}
      className={`${classes.container} pt-25 pl-4`}
    >
      {checkIngredient || checkBun ? (
        <>
          {checkBun && (
            <ConstructorElement
              extraClass={`${classes.ingredientElement} mb-4 mr-3`}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type="top"
              isLocked={true}
            />
          )}
          {checkIngredient ? (
            <div className={classes.scrollWrapper}>
              <Reorder.Group
                values={ingredients}
                onReorder={(newOrder) => dispatch(sortIngredient(newOrder))}
                className={`${classes.ingredientList} `}
              >
                {ingredients.map((item: TIngredient) => (
                  <ConstructorList value={item} key={item.nanoid} />
                ))}
              </Reorder.Group>
            </div>
          ) : (
            errorMessage("Добавьте начинку")
          )}
          {checkBun ? (
            <ConstructorElement
              extraClass={`${classes.ingredientElement} mt-4 mr-3`}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type="bottom"
              isLocked={true}
            />
          ) : (
            errorMessage("Добавьте булочку")
          )}
          <div className={`${classes.currencyContainer} pt-10`}>
            <p className="text text_type_digits-medium">{totalCost}</p>
            <img
              className="pl-2 pr-10"
              src={bigCurrencyIcon}
              alt="иконка валюты"
            />
            <Button
              onClick={() => {
                handleClickOrder();
              }}
              htmlType="button"
              type="primary"
              size="large"
              disabled={checkBun && checkIngredient ? false : true}
            >
              Оформить заказ
            </Button>
          </div>

          {open && (
            <Modal
              onClose={() => {
                dispatch(resetOrder());
                dispatch(resetConstructor());
                dispatch(wsDisconnect());
                dispatch(wsResetMessage());
                setOpen(false);
              }}
              type="modalOutRoute"
            >
              <OrderСompletedModal />
            </Modal>
          )}
        </>
      ) : (
        <div
          className={`${classes.defaultContainer} text text_type_main-large pt-30`}
        >
          <BurgerIcon type={isActive ? "success" : "primary"} />
          {isActive
            ? "Можно добавить!"
            : "Соберите свой бургер, пока заказ пуст..."}
        </div>
      )}
    </section>
  );
});

export default BurgerConstructor;
