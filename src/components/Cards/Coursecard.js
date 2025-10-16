import React from "react";
import styled from "styled-components";


const Card = styled.div`
    width: 450px;
    height: 150px;
    background-color: ${({ theme }) => theme.card};
    cursor: pointer;
    
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
`;

const Tags = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
    align-items: center;
`;

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.text_secondary + 10 };
    padding: 2px 8px;
    border-radius: 10px;
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Date = styled.div`
    font-size: 12px;
    font-weight: 400;
    margin-left: 2px;
    color: ${({ theme }) => theme.text_secondary + 80};
    
    @media (max-width: 768px){
        font-size: 10px;
    }
`;

const Coursecard = ({courses}) => {
    return (
        <Card>
        
        <Details>
            <Title>{courses.title}</Title>
            <Date>{courses.date}</Date>
            <Tags>
            {courses.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
            ))}
        </Tags>
        </Details>
        
        </Card>
    );
};

export default Coursecard;