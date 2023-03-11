import React, { FC } from "react";
import { IngredientCard } from "../index";
import classes from "./IngredientsCategory.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TIngredientsCategory } from "../../services/types";

const IngredientsCategory: FC<TIngredientsCategory> = React.memo(
  ({ filteredArr }) => {
    const location = useLocation();

    return (
      <>
        {filteredArr.map((item) => (
          <li className={classes.card} key={item._id}>
            <Link
              className={classes.link}
              to={`/ingredients/${item._id}`}
              state={{ backgroundLocation: location }}
            >
              <IngredientCard data={item} />
            </Link>
          </li>
        ))}
      </>
    );
  }
);

export default IngredientsCategory;
// TODO: this
