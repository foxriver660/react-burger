import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <section className={`p-4 ${classes.header}`}>
      <div className={`${classes.container}`}>
        <nav className={classes.navContainer}>
          <ul className={classes.navList}>
            <li>
              <Button
                extraClass={`${classes.navItemActive} ${classes.navItem}  pl-5 pr-5 pt-4 pb-4`}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                <BurgerIcon type="primary" /> Конструктор
              </Button>
            </li>
            <li>
              <Button
                extraClass={`${classes.navItem} pl-5 pr-5 pt-4 pb-4`}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                <ListIcon type="secondary" /> Лента заказов
              </Button>
            </li>
          </ul>
        </nav>

        <Logo />
        <Button
          extraClass={`${classes.navItem} ${classes.logInBtn} pl-5 pr-5 pt-4 pb-4`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <ProfileIcon type="secondary" /> Личный кабинет
        </Button>
      </div>
    </section>
  );
};
export default AppHeader;

{
  /* <button className={`pl-5 pr-5 pb-4 pt-4 ${classes.navButton}`}><BurgerIcon type="primary" />
            <p className={`${classes.btnText} pl-2`}>Конструктор</p></button> */
}
