import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const TaskCard = ({
  headerTask,
  created_at: created,
  contentTask,
  userId,
  _id: id,
  onRemove
}) => {
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <div className="col">
      <div className="card shadow-sm h-100 border-warning">
        <div className="card-body bg-warning ">
          <button
            type="button"
            className="btn btn-danger position-absolute top-0 end-0 btn-sm"
            title="Удалить"
            onClick={() => onRemove(id)}
          >
            <i className="bi bi-trash3"></i>
          </button>
          <h6 className="card-title me-3">{headerTask}</h6>
          <p className="card-text">{contentTask}</p>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between align-items-center">
          <span>{displayDate(created)}</span>
          <Link
            className="btn btn-primary"
            to={`/tasks/${currentUserId}/${id}`}
          >
            Открыть
          </Link>
        </div>
      </div>
    </div>
  );
};
TaskCard.propTypes = {
  headerTask: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contentTask: PropTypes.string,
  _id: PropTypes.string,
  onRemove: PropTypes.func,
  userId: PropTypes.string
};

export default TaskCard;
