import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes/${id}`
      );
      const data = await response.json();
      setClassData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!classData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>수업 상세 정보</h1>
      <ul className="list-group">
        <li className="list-group-item">ID: {classData.id}</li>
        <li className="list-group-item">Class Name: {classData.cname}</li>
        <li className="list-group-item">Credit: {classData.credit}</li>
        <li className="list-group-item">Professor: {classData.prof}</li>
        <li className="list-group-item">Class Code: {classData.code}</li>
        <li className="list-group-item">Grading Type: {classData.type}</li>
      </ul>
      <Link to="/list" className="btn btn-secondary mt-3">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
