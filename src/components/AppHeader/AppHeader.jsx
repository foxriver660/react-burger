import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import classes from './AppHeader.module.css'


const AppHeader = () => {
  return (
    <section className={`p-4 ${classes.header}`}>
      <div className={`${classes.container}`}>
      <nav className={classes.navContainer}>
        <ul className={classes.navList}>
          <li>
            <button className={`pl-5 pr-5 pb-4 pt-4 ${classes.navButton}`}><BurgerIcon type="primary" />
            <p className={`${classes.btnText} pl-2`}>Конструктор</p></button>
          </li>
          <li>
            <button className={`pl-5 pr-5 pb-4 pt-4 ${classes.navButton}`}><ListIcon type="primary" className='pr-2'/>
            <p className={`${classes.btnText} pl-2`}>Лента заказов</p></button>
          </li>
        </ul>
      </nav>
     
      <Logo  />
<button className={`pl-5 pr-5 pb-4 pt-4 ${classes.button}`}><ProfileIcon type="primary" /><p className={`${classes.btnText} pl-2`}>Личный кабинет</p></button>
</div>
    </section>
  );
};
export default AppHeader;
