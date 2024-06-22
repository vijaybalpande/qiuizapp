import React, { useState } from "react";
import { Data } from "../Data";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Home.css";




const Quiz = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/Login");
  };

  const [data, setData] = useState(Data);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  console.log(data);

  const next = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      document.querySelector(
        ".score"
      ).innerHTML = `<p>Your Score : ${score}/5</p>`;

      document.querySelector(".quiz").innerHTML = "";

      let nextBtn = document.querySelector("#next");
      nextBtn.innerHTML = "Play Again";
      nextBtn.classList.add("reset");
      const reset = document.querySelector(".reset");
      reset.addEventListener("click", () => {
        window.location.reload();
      });
    }

    const checked = document.querySelectorAll(".checkedValue");
    checked.forEach((curVal) => {
      curVal.checked = false;
    });
  };

  const handleInput = (event) => {
    let chooseVal = event.target.value;
    console.log(chooseVal);
    if (chooseVal === data[index].ans) {
      setScore(score + 1);
    }
  };
  console.log(score);
  return (
    <>
          <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand">Welcome - {userName.email}</a>
        <div className="d-flex align-items-center">
          <li className="nav-item dropdown list-unstyled">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Try More
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">HTML</a></li>
              <li><a className="dropdown-item" href="#">CSS</a></li>
              <li><a className="dropdown-item" href="#">REACT</a></li>
            </ul>
          </li>
          <button
            onClick={handleLogout}
            type="button"
            className="btn btn-primary ms-3"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    
      <div className="container mt-5">
     
        <div className="quiz">
          <div>
            <h1>Q : {data[index].q}</h1>
          </div>
          <div className="option">
            <input
              name="select"
              type="radio"
              onChange={handleInput}
              className="checkedValue"
              value={data[index].a}
            />
            <p>A : {data[index].a}</p>
          </div>

          <div className="option">
            <input
              name="select"
              type="radio"
              onChange={handleInput}
              className="checkedValue"
              value={data[index].b}
            />
            <p>B : {data[index].b}</p>
          </div>

          <div className="option">
            <input
              name="select"
              type="radio"
              onChange={handleInput}
              className="checkedValue"
              value={data[index].c}
            />
            <p>C : {data[index].c}</p>
          </div>

          <div className="option">
            <input
              name="select"
              type="radio"
              onChange={handleInput}
              className="checkedValue"
              value={data[index].d}
            />
            <p>D : {data[index].d}</p>
          </div>
        </div>

        <div className="score"></div>
        <div className="btns">
          <button className="mt-3" style={{ width: '100px' }} id="next" onClick={next}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();
//   const userName = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("loggedin");
//     navigate('/Login');
//   }

//   return (
//     <nav className="navbar bg-body-tertiary">
//       <div className="container-fluid">
//         <a className="navbar-brand">Navbar - userName.email</a>
//         <div className="d-flex align-items-center">

//           <button
//             onClick={handleLogout}
//             type="button"
//             className="btn btn-primary">
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Home;
