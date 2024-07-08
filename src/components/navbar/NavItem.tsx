import React from "react";
import styles from "./Nav.module.css";
import { NavType } from "./Nav";
import { getIcon } from "../../util/getIcon";
import { useNavigate } from "react-router-dom";

export const NavItem = (props: { item: NavType, isActive: boolean }) => {
  const navigate = useNavigate();

  const navigateItem = () => {
    navigate(`${props.item.path}`);
  }

  return (
    <div className={`${styles.item} ${props.isActive ? 'isActiveNav' : ''}`} onClick={navigateItem}>
      <div className={styles.icon}>{getIcon(props.item.icon)}</div>
      <span className={styles.name}>{props.item.name}</span>
    </div>
  );
};
