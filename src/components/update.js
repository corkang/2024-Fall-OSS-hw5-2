import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cname: '',
    credit: '',
    prof: '',
    code: '',
    type: ''
  });
  const [prevFormData, setPrevFormData] = useState({});
  const [editCount, setEditCount] = useState(0);

  const cnameRef = useRef();
  const creditRef = useRef();
  const profRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes/${id}`
      );
      const data = await response.json();

      setFormData({
        cname: data.cname,
        credit: data.credit,
        prof: data.prof,
        code: data.code,
        type: data.type
      });

      setPrevFormData({
        cname: data.cname,
        credit: data.credit,
        prof: data.prof,
        code: data.code,
        type: data.type
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const currentValue = formData[name];
    const previousValue = prevFormData[name];

    if (currentValue !== previousValue) {
      if (name === 'cname' && !currentValue) {
        alert('Class Name을 입력해주세요.');
        cnameRef.current.focus();
        return;
      }

      if (name === 'credit' && (!currentValue || currentValue <= 0)) {
        alert('Credit을 올바르게 입력해주세요.');
        creditRef.current.focus();
        return;
      }

      if (name === 'prof' && !currentValue) {
        alert('Professor를 입력해주세요.');
        profRef.current.focus();
        return;
      }

      if (name === 'code' && !currentValue) {
        alert('Class Code를 입력해주세요.');
        codeRef.current.focus();
        return;
      }

      if (name === 'type' && !currentValue) {
        alert('Grading Type을 입력해주세요.');
        typeRef.current.focus();
        return;
      }

      setEditCount(prevCount => prevCount + 1);
      updateData(formData);
      setPrevFormData(prevData => ({
        ...prevData,
        [name]: currentValue
      }));
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>수업 수정</h1>
        <div>
          <span className="badge bg-primary fs-5">수정 횟수: {editCount}</span>
        </div>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Class Name</label>
          <input
            type="text"
            className="form-control"
            name="cname"
            value={formData.cname}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={cnameRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Credit</label>
          <input
            type="number"
            className="form-control"
            name="credit"
            value={formData.credit}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={creditRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Professor</label>
          <input
            type="text"
            className="form-control"
            name="prof"
            value={formData.prof}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={profRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Class Code</label>
          <input
            type="text"
            className="form-control"
            name="code"
            value={formData.code}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={codeRef}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grading Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={typeRef}
          />
        </div>
      </form>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/list')}>
        목록으로 돌아가기
      </button>
    </div>
  );
}
