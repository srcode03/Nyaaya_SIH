import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
export default function Profile() {
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
  const [val, setVal] = useState([]);
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
    axios
      .get("http://localhost:8000/admin/getall")
      .then((response) => {
        setVal(response.data.people); // Update val using setVal
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(val)
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  <MDBCardText>
                    {spec} {role}
                  </MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">1</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Appointments Pending:
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Cases Won
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">123</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Cases Lost
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      Empowering clients through legal expertise and unwavering
                      advocacy for a just and equitable society
                    </MDBCardText>
                  </div>
                </div>
                <h1>Pending Appointments:</h1>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
              {val &&
                val
                  .filter((i) => i.id) // Filter out items without a name
                  .map((i) => <ProfileCard val={i} key={i._id} />)}
            </div>
                <MDBRow>
                  <MDBCol className="mb-2"></MDBCol>
                  <MDBCol className="mb-2"></MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2"></MDBCol>
                  <MDBCol className="mb-2"></MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
