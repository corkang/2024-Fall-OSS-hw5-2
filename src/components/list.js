import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShowList() {
  const [classes, setClasses] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes"
      );
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes/${id}`,
        {
          method: "DELETE",
        }
      );
      getData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>수업 목록</h1>
        <div>
          <button className="btn btn-primary me-2" onClick={getData}>
            수업 데이터 가져오기
          </button>
          <Link to="/create" className="btn btn-success">
            수업 추가
          </Link>
        </div>
      </div>

      <ul className="list-group">
        {classes.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.id} - [{item.code}] {item.cname} ({item.prof}) - {item.type}
            </span>
            <div>
              <Link to={`/detail/${item.id}`} className="btn btn-info btn-sm me-2">
                상세보기
              </Link>
              <Link to={`/update/${item.id}`} className="btn btn-success btn-sm me-2">
                수정
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteData(item.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
