import React from "react";
import styled from "styled-components";
import { useState } from 'react';
import Coursecard from '../Cards/Coursecard';
import { courses } from "../../data/constants";




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
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);

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

const ToogleGroup = styled.div`
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

const ToogleButton = styled.div`
    padding: 8px 18px;
    cursor: pointer;
    border-radius: 6px;

    ${({ active, theme }) =>
        active && `
    background-color: ${({ theme }) => theme.primary + 20};
    `}

    &:hover {
        background-color: ${({ theme }) => theme.primary + 8};
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 28px;
`;


const Courses = () => {
    const [toggle, setToggle] = useState("all");
    return (<Container id="courses">
        <Wrapper>
        <Title>Relevant Courses</Title>
        <Desc>
          Below are some courses I took that are relevant to the IT career field.
        </Desc>

        <ToogleGroup>
            {toggle === "all" ? (
            <ToogleButton active value="all" onClick={() => setToggle("all")}>
            ALL
            </ToogleButton>
    ) : (
        <ToogleButton value="all" onClick={() => setToggle("all")}>
            ALL
        </ToogleButton>
    )}
            <Divider />
            {toggle === "programming" ? (
            <ToogleButton active onClick={() => setToggle("programming")}>
            PROGRAMMING
            </ToogleButton>
            ) : (
            <ToogleButton onClick={() => setToggle("programming")}>
            PROGRAMMING
            </ToogleButton>
            )}
            <Divider />
            {toggle === "hardware" ? (
            <ToogleButton active onClick={() => setToggle('hardware')}>
            HARDWARE
                </ToogleButton>
            ) : (
            <ToogleButton onClick={() => setToggle('hardware')}>
                HARDWARE
                </ToogleButton>
            )}

            <Divider />
            {toggle === "lecture-based" ? (
            <ToogleButton active onClick={() => setToggle("lecture-based")}>
                LECTURE-BASED
                </ToogleButton>
            ) : (
            <ToogleButton onClick={() => setToggle("lecture-based")}>
                LECTURE-BASED
                </ToogleButton>
            )}
            <Divider />
        </ToogleGroup>
        <CardContainer>
                {toggle === "all" && 
                courses.map((courses) => <Coursecard courses ={courses} />)}
                {courses
                .filter((item) => item.category === toggle) 
                .map((courses) => (
                    <Coursecard courses={courses} />
                ))}
        </CardContainer>        
        </Wrapper>
        </Container>
    );
};

export default Courses;