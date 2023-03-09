import React, { FC, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  InfoIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import classes from "./BurgerConstructor.module.css";
import bigCurrencyIcon from "../../images/bigCurrencyIcon.svg";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import OrderСompletedModal from "../OrderСompletedModal/OrderСompletedModal";
import Modal from "../Modal/Modal";
import { useDrop } from "react-dnd";
import { BUN } from "../utils/constant";
import {
  addIngredient,
  addBun,
  sortIngredient,
  calcIngredients,
  resetConstructor,
} from "../../services/actions/ingredientActions";
import { resetOrder, getApiOrder } from "../../services/actions/orderActions";
import ConstructorList from "../ConstructorList/ConstructorList";
import { Reorder } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import {
  wsDisconnect,
  wsConnectionStartHistory,
  wsResetMessage,
} from "../../services/actions/wsActions";
import {
  getSuccessTokenUpdate,
  getTotalCost,
  getIngredients,
  getBun,
  getOrderRequestFailed,
  getAuthUser,
  getWsConnectedFailed,
} from "../../selectors/selectors";
import { TIngredient } from "../../services/types/data";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

const BurgerConstructor: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const totalCost = useAppSelector(getTotalCost);
  const ingredients = useAppSelector(getIngredients);
  const bun = useAppSelector(getBun);
  const authUser = useAppSelector(getAuthUser);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);
  const orderRequestFailed = useAppSelector(getOrderRequestFailed);
  const wsConnectedFailed = useAppSelector(getWsConnectedFailed);
  // НАПРАВЛЯЕМ ID НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ORDER
  const handleClickOrder = () => {
    const ingredientsId = [
      ...ingredients.map((item: TIngredient) => item._id),
      bun._id,
    ];
    if (authUser) {
      dispatch(wsResetMessage());
      dispatch(getApiOrder(ingredientsId, `Bearer ${getCookie("token")}`));  
      dispatch(wsConnectionStartHistory());
      setOpen(true);
    } else {
      navigate("/login");
    }
  };
  // ПРЕДОХРАНИТЕЛЬ НА СЛУЧАЙ ИСТЕЧЕНИЯ СРОКА ***accessToken***
  React.useEffect(() => {
    const ingredientsId = [
      ...ingredients.map((item: TIngredient) => item._id),
      bun._id,
    ];
    if (successTokenUpdate && (orderRequestFailed || wsConnectedFailed)) {
      dispatch(getApiOrder(ingredientsId, `Bearer ${getCookie("token")}`));
      wsConnectedFailed && dispatch(wsConnectionStartHistory());
    }
  }, [successTokenUpdate, orderRequestFailed, wsConnectedFailed]); // eslint-disable-line

  // !DRAG AND DROP
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: "items",
    drop: (item: {id: string; type: string}) => {
      console.log(item)
      item.type === BUN
        ? dispatch(addBun(item))
        : dispatch(addIngredient(item));
      dispatch(calcIngredients());
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let outline = "none";
  if (isActive) {
    outline = "3px solid #00cccc";
  } else if (canDrop) {
    outline = "1px solid red";
  }

  // ИНСТРУМЕНТЫ ДЛЯ УСЛОВНОГО РЕНДЕРИНГА
  const checkIngredient = ingredients.length > 0;
  const checkBun = !!bun.type;
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
