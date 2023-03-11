import React, { FC } from "react";
import classes from "./NotFoundPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage: FC = React.memo(() => {
  return (
    <div className={classes.errorContainer}>
      <h1 className={`${classes.text} text text_type_main-large pt-30 pb-30`}>
        Такая страница не существует.
      </h1>
      <Button htmlType={"button"}>
        <Link
          to={"/"}
          replace
          className={`${classes.btn} text text_type_main-default`}
        >
          Вернуться на главную страницу
        </Link>
      </Button>
    </div>
  );
});

export default NotFoundPage;
// TODO: this