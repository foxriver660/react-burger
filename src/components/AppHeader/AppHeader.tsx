import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./AppHeader.module.css";

const AppHeader = React.memo(() => {
  const location = useLocation();

  const setActive = ({isActive }: {isActive: boolean}) =>
   isActive ? classes.linkActive : classes.link;

  return (
    <header className={`p-4 ${classes.header}`}>
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
                <NavLink className={setActive} to="/" state={"constructor"}>
                  <BurgerIcon
                    type={
                      location.state === "constructor" ? "primary" : "secondary"
                    }
                  />{" "}
                  Конструктор
                </NavLink>
              </Button>
            </li>
            <li>
              <Button
                extraClass={`${classes.navItem} pl-5 pr-5 pt-4 pb-4`}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                <NavLink
                  className={setActive}
                  to="feed"
                  state={{ feed: true }}
                  end
                >
                  <ListIcon
                    type={location.state?.feed ? "primary" : "secondary"}
                  />{" "}
                  Лента заказов
                </NavLink>
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
          <NavLink className={setActive} to="/profile" state={"profile"}>
            <ProfileIcon
              type={location.state === "profile" ? "primary" : "secondary"}
            />{" "}
            Личный кабинет
          </NavLink>
        </Button>
      </div>
    </header>
  );
});
export default AppHeader;
