import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./AppHeader.module.css";
import { PATH } from "../../utils/constant";
import { Link } from "react-router-dom";

const AppHeader: FC = React.memo(() => {
  const location = useLocation();
  const setActive = ({ isActive }: { isActive: boolean }) =>
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
                <NavLink className={setActive} to="/">
                  <BurgerIcon
                    type={
                      location.pathname === PATH.HOME ? "primary" : "secondary"
                    }
                  />
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
                <NavLink className={setActive} to="feed" end>
                  <ListIcon
                    type={
                      location.pathname === PATH.FEED ? "primary" : "secondary"
                    }
                  />
                  Лента заказов
                </NavLink>
              </Button>
            </li>
          </ul>
        </nav>

        <Link to={PATH.HOME}>
          <Logo />
        </Link>
        <Button
          extraClass={`${classes.navItem} ${classes.logInBtn} pl-5 pr-5 pt-4 pb-4`}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          <NavLink className={setActive} to="/profile">
            <ProfileIcon
              type={
                location.pathname === PATH.PROFILE ||
                location.pathname === PATH.PROFILE_ORDERS
                  ? "primary"
                  : "secondary"
              }
            />
            Личный кабинет
          </NavLink>
        </Button>
      </div>
    </header>
  );
});
export default AppHeader;
