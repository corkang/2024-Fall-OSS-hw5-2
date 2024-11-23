import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const cnameRef = useRef();
  const creditRef = useRef();
  const profRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes/${id}`
      );
      const data = await response.json();

      // 폼에 기존 데이터 채우기
      cnameRef.current.value = data.cname;
      creditRef.current.value = data.credit;
      profRef.current.value = data.prof;
      codeRef.current.value = data.code;
      typeRef.current.value = data.type;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = async (data) => {
    try {
      await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      navigate('/list');
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cnameRef.current.value) {
      alert('Class Name을 입력해주세요.');
      cnameRef.current.focus();
      return;
    }

    if (!creditRef.current.value || creditRef.current.value <= 0) {
      alert('Credit을 올바르게 입력해주세요.');
      creditRef.current.focus();
      return;
    }

    const updatedData = {
      cname: cnameRef.current.value,
      credit: creditRef.current.value,
      prof: profRef.current.value,
      code: codeRef.current.value,
      type: typeRef.current.value,
    };

    updateData(updatedData);
  };

  return (
    <div className="container mt-5">
      <h1>수업 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Class Name</label>
          <input type="text" className="form-control" ref={cnameRef} />
        </div>
        <div className="mb-3">
          <label className="form-label">Credit</label>
          <input type="number" className="form-control" ref={creditRef} />
        </div>
        <div className="mb-3">
          <label className="form-label">Professor</label>
          <input type="text" className="form-control" ref={profRef} />
        </div>
        <div className="mb-3">
          <label className="form-label">Class Code</label>
          <input type="text" className="form-control" ref={codeRef} />
        </div>
        <div className="mb-3">
          <label className="form-label">Grading Type</label>
          <input type="text" className="form-control" ref={typeRef} />
        </div>
        <button type="submit" className="btn btn-primary">
          수정
        </button>
      </form>
    </div>
  );
}
