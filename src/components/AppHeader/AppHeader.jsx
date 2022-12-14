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
                extraClass={`pl-5 pr-5 pt-4 pb-4`}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                <a
                  className={`${classes.navItemActive} ${classes.navItem}`}
                  href="/#"
                >
                  <BurgerIcon type="primary" /> Конструктор
                </a>
              </Button>
            </li>
            <li>
              <Button
                extraClass={`${classes.navItem} pl-5 pr-5 pt-4 pb-4`}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                <a className={`${classes.navItem}`} href="/#">
                  <ListIcon type="secondary" /> Лента заказов
                </a>
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
          <a className={`${classes.navItem}`} href="/#">
            <ProfileIcon type="secondary" /> Личный кабинет
          </a>
        </Button>
      </div>
    </section>
  );
};
export default AppHeader;
