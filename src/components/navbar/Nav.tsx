import React, { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { NavItem } from "./NavItem";
import { useLocation } from "react-router-dom";

export interface NavType {
  path: string;
  name: string;
  icon: string;
}

export const Nav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>();
  const navItem: NavType[] = [
    {
      path: "/list",
      name: "동아리",
      icon: "list",
    },
    {
      path: "/",
      name: "홈",
      icon: "home",
    },
    {
      path: "/mypage",
      name: "내정보",
      icon: "my",
    },
  ];

  const isActive = () => {
    setActiveItem(location.pathname);
  };

  useEffect(() => {
    isActive();
  }, [location]);

  return (
    <div className={styles.nav}>
      {navItem.map((item, idx) => (
        <NavItem
          key={`nav-item-${idx}`}
          item={item}
          isActive={item.path === activeItem}
        />
      ))}
    </div>
  );
};
