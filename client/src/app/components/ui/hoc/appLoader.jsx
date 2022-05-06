import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasksListById } from "../../../store/tasks";
import PropTypes from "prop-types";
import {
  getCurrentUserId,
  getIsLoggedIn,
  loadUsersList
} from "../../../store/users";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = useSelector(getCurrentUserId());

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadTasksListById(userId));
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
