import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"

export const getIcon = (icon) => {
  if (icon === "home") {
    return <FontAwesomeIcon icon={faHouse} />;
  } else if (icon === "list") {
    return <FontAwesomeIcon icon={faUsers} />
  } else if (icon === "my") {
    return <FontAwesomeIcon icon={faUser} />
  } else {
    return null;
  }
}
