import React, { useState } from "react";
import styled from "styled-components";
import Coursecard from "../Cards/Coursecard";
import { courses } from "../../data/constants";

const Card = styled.div`
  width: 100%; /* Grid handles the width */
`;

const Container = styled.div`
  background: linear-gradient(
    343.07deg,
    rgba(132, 59, 206, 0.06) 5.71%,
    rgba(132, 59, 206, 0) 64.83%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 98%, 0 100%);
`;

const Wrapper = styled.div`
  max-width: 1350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 10px 0px 100px 0;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  max-width: 600px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  cursor: pointer;
  border-radius: 6px;

  ${({ active }) =>
    active &&
    `
    background-color: rgba(132, 59, 206, 0.2); // semi-transparent primary
  `}

  &:hover {
    background-color: rgba(132, 59, 206, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 28px;

  @media (max-width: 960px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Courses = () => {
  const [toggle, setToggle] = useState("all");

  const renderToggleButton = (value, label) => (
    <>
      <ToggleButton
        key={value}
        active={toggle === value}
        onClick={() => setToggle(value)}
      >
        {label}
      </ToggleButton>
      <Divider />
    </>
  );

  const filteredCourses =
    toggle === "all"
      ? courses
      : courses.filter((course) => course.category === toggle);

  return (
    <Container id="courses">
      <Wrapper>
        <Title>Relevant Courses</Title>
        <Desc>
          Below are some courses I took that are relevant to the IT career
          field.
        </Desc>

        <ToggleGroup>
          {renderToggleButton("all", "ALL")}
          {renderToggleButton("programming", "PROGRAMMING")}
          {renderToggleButton("hardware", "HARDWARE")}
          {renderToggleButton("lecture-based", "LECTURE-BASED")}
        </ToggleGroup>

        <CardContainer>
          {filteredCourses.map((course) => (
            <Card key={course.id}>
              <Coursecard courses={course} />
            </Card>
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Courses;
