import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Chart } from "react-google-charts";
import styles from '../../styles/styles'
import {
  MDBCardTitle,
  MDBRipple,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function ProfilePage() {
  const { id } = useParams();
  const data = [
    ["Cases", "Number"],
    ["Won", 10],
    ["Lost", 20],
    ["Adjourned", 5],
  ];
  const options = {
    title: "Past History:",
  };
  const navigate = useNavigate();
  const handlelogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem("token");
    navigate('/')
  }
  const handlehome=(e)=>{
    e.preventDefault()
    navigate('/')
  }
  const handleappointment=(e)=>{
      e.preventDefault()
      navigate(`/admin/profile/appointment/:${id}`)
  }
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [role, setrole] = useState("");
  const [city, setcity] = useState("");
  const [spec, setspec] = useState("");
  const [experience, setexperience] = useState("");
  const [language, setlanguage] = useState("");
  const [fees, setfees] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/admin/profile", {
        token: token,
      })
      .then(function (response) {
        setEmail(response.data.user.email);
        setName(response.data.user.name);
        setage(response.data.user.age);
        setgender(response.data.user.gender);
        setphoneno(response.data.user.phoneno);
        setrole(response.data.user.role);
        setcity(response.data.user.city);
        setspec(response.data.user.spec);
        setexperience(response.data.user.experience);
        setlanguage(response.data.user.language);
        setfees(response.data.user.fees);
      });
  });
  return (
    <section className="bg-slate-400">
      <MDBContainer className="py-5 font-Poppins font-bold">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className=" flex bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <div>
                <h1>Nyayaa</h1>
                <button onClick={handlehome} type="button" class="btn btn-primary">Home</button>
                <button onClick={handlelogout} type="button" class="btn btn-primary ml-2">Logout</button>
                </div>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <div class="card rounded-md">
                  <div class="card-body p-4  shadow-lg  ">
                    <div class="flex text-black">
                      <div class="flex-grow-1 pr-10 mr-8">
                        <img
                          class="rounded-sm w-20 h-16 mt-6 border-2 border-black rounded-circle"
                          src="data:image/jpeg;base64,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"
                        ></img>
                        <h5 class="mb-1">
                          {name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 inline-block"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                            />
                          </svg>
                        </h5>
                        <p class="mb-2 pb-4">Family {role}</p>
                        <div class="flex justify-evenly rounded-3 p-2 mb-2 ">
                          <div>
                            <p class="small text-muted mb-1">Experience</p>
                            <p class="mb-0">{experience} Years</p>
                          </div>
                          <div>
                            <p class="small text-muted mb-1 pl-2">Age:</p>
                            <p class="mb-0">{age}</p>
                          </div>
                          <div class="px-3">
                            <p class="small text-muted mb-1">Gender</p>
                            <p class="mb-0">{gender}</p>
                          </div>
                          <div>
                            <p class="small text-muted mb-1">City</p>
                            <p class="mb-0">{city}</p>
                          </div>
                          <div>
                            <p class="small text-muted mb-1 pr-2">Rating</p>
                            <p class="mb-0">8.5</p>
                          </div>
                        </div>
                        <div class="grid pt-1 align-top">
                          <button
                            onClick={handleappointment}
                            type="button"
                            class="btn btn-outline-primary mr-4 "
                          >
                            Book an appointment
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary pt-2 mt-2 mr-4"
                          >
                            Chat Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>Popular reviews:</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>One of the Best Lawyers ever</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>
                      Represented me in my family proceedings. Never once did I
                      doubt I was in the best possible hands. Phone calls were
                      returned without delay. I'd recommend him for most any
                      legal matter.
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>
                      Over the years he has provided me with sound,
                      clear, and practical legal advice on various issues
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>
                      He has assisted me with my child custody and
                      child support cases. He is absolutely fantastic and did a
                      great job. I highly recommend him!
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                      />
                    </MDBCardText>
                    <MDBCardText class="font-extrabold text-lg">
                      Fees(Breakup):
                    </MDBCardText>
                    <MDBCardText class="font-extrabold text-lg">
                      Appointment Fees:Rs100000
                    </MDBCardText>
                    <MDBCardText class="font-extrabold text-lg">
                      Per Hearing Fees:Rs{fees}
                    </MDBCardText>
                    <MDBCardText class="font-extrabold text-lg">
                      Retainer Fees:Rs90000
                    </MDBCardText>

                    <MDBCardText class="text-bold text-md">
                      Badges won:
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=" ml-2 w-6 h-6 inline-block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="inline-block ml-10 w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                          />
                        </svg>

                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                        />
                      </svg>
                    </MDBCardText>

                    <MDBCardText className="text-2xl">
                      Overall Experience of clients so far:
                    </MDBCardText>

                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
