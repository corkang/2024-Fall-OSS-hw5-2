import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cname: '',
    credit: '',
    prof: '',
    code: '',
    type: ''
  });

  const cnameRef = useRef();
  const creditRef = useRef();
  const profRef = useRef();
  const codeRef = useRef();
  const typeRef = useRef();

  const postData = async (data) => {
    try {
      await fetch("https://672819f2270bd0b975546091.mockapi.io/api/v1/Classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate('/list');
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.cname) {
      alert('Class Name을 입력해주세요.');
      cnameRef.current.focus();
      return;
    }

    if (!formData.credit || formData.credit <= 0) {
      alert('Credit을 올바르게 입력해주세요.');
      creditRef.current.focus();
      return;
    }

    if (!formData.prof) {
      alert('Professor를 입력해주세요.');
      profRef.current.focus();
      return;
    }

    if (!formData.code) {
      alert('Class Code를 입력해주세요.');
      codeRef.current.focus();
      return;
    }

    if (!formData.type) {
      alert('Grading Type을 입력해주세요.');
      typeRef.current.focus();
      return;
    }

    postData(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <h1>수업 추가</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Class Name</label>
          <input
            type="text"
            className="form-control"
            name="cname"
            value={formData.cname}
            onChange={handleChange}
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
            ref={typeRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          추가
        </button>
      </form>
    </div>
  );
}
