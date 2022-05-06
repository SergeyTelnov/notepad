import React from "react";

const Main = () => {
  return (
    <div className="container mt-5">
      <h3>Добро пожаловать!</h3>
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-4 mb-5">
          <div className="row">
            <span className="fs-3 main-name">Notepad</span>
            <span className="fs-4 main-text">
              - это приложение для быстрых заметок
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col mb-5">
              <div className="card shadow-sm h-100 border-warning ">
                <div className="card-body bg-warning ">
                  <span className="position-absolute top-0 end-0 button-main-card-delete">
                    <i className="bi bi-trash3"></i>
                  </span>
                  <h6 className="card-title me-3">Добавляй</h6>
                  <p className="card-text">Создавай новые заметки</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                  <span>15.01.2022</span>
                  <span className="badge bg-primary button-main-card">
                    Открыть
                  </span>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card shadow-sm h-100 border-warning">
                <div className="card-body bg-warning ">
                  <span className="position-absolute top-0 end-0 button-main-card-delete">
                    <i className="bi bi-trash3"></i>
                  </span>
                  <h6 className="card-title me-3">Редактируй</h6>
                  <p className="card-text">Изменяй и обновляй свои заметки</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                  <span>07.03.2022</span>
                  <span className="badge bg-primary button-main-card">
                    Открыть
                  </span>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card shadow-sm h-100 border-warning">
                <div className="card-body bg-warning ">
                  <span className="position-absolute top-0 end-0 button-main-card-delete">
                    <i className="bi bi-trash3"></i>
                  </span>
                  <h6 className="card-title me-3">Удаляй</h6>
                  <p className="card-text">Удаляй свои ненужные заметки</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                  <span>20.04.2022</span>
                  <span className="badge bg-primary button-main-card">
                    Открыть
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
