import { ReactNode } from "react"
import styled from "styled-components";

interface WithBorderAnimationNewProps {
  children: ReactNode;
  animationEllipse?: boolean;
  padding?: string;
  radius?: string;
}

const AnimationEllipse = styled.div`
  position: absolute;
  inset: 0;

  &::after {
    transition: all 0.4s ease-in-out;
    position: absolute;
    content: '';
    z-index: 3;
    border-radius: 50%;
    background-color: #ffffff;
    width: 33%;
    height: 52%;
    left: -29%;
    top: -47%;
  }
`

const Animation = styled.div<{radius?: string}>`
  content: '';
  transition: all 0.4s ease-in-out;
  position: absolute;
  z-index: -1;
  inset: 0;
  padding: 0.21rem; 
  border: 0.0625rem solid rgba(255, 255, 255, 0.15);
  border-radius: ${({ radius }) => radius ? radius : '0.87rem'};
  opacity: 0;
  
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box,
     linear-gradient(#fff 0 0); 
  -webkit-mask-composite: xor; 
  mask-composite: exclude; 

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    height: 1000%;
    background: linear-gradient(to right, transparent, white, transparent);
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    0%   {
            transform: translate(-50%, -50%) rotate(0deg);
         }
    100% {
            transform: translate(-50%, -50%) rotate(360deg);
         }
    }
`

const Card = styled.div<{
    padding?: string;
    radius?: string;
    overflowHidden?: boolean;
}>`
    position: relative;
    overflow: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : null)};
    color: #fff;
    z-index: 0;
    padding: ${({ padding }) => (padding ? padding : '0.46rem')};
    border-radius: ${({ radius }) => (radius ? radius : '0.87rem')};

    &:focus-within {
        box-shadow: 0rem 0.125rem 0.125rem 0rem rgba(0, 0, 0, 0.25);

        ${Animation} {
            opacity: 1;
        }

        ${AnimationEllipse} {
            &::after {
                width: 150%;
                height: 200%;
                opacity: 0;
            }
        }

        .plate-button {
            background-color: #ffffff;
        }
    }
`;

export const WithBorderAnimationNew = ({
    animationEllipse,
    children,
    padding,
    radius,
}: WithBorderAnimationNewProps) => {
    return (
        <Card
            padding={padding}
            radius={radius}
            overflowHidden={animationEllipse}
        >
            <Animation radius={radius} />
            {animationEllipse && <AnimationEllipse />}
            {children}
        </Card>
    );
};