import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const StyledWithBorderAnimation = styled.div<{
    width?: string;
    height?: string;
    padding?: string;
    wrapperBackground?: string;
    focus?: boolean;
    m?: string;
    radius?: string;
    withoutTranslate?: boolean;
    withoutEllipse?: boolean;
    onlyManualFocus?: boolean;
}>`
    border-radius: 2rem;
    padding: ${({ padding }) => padding && `${padding}`};
    position: relative;
    ${({ width }) =>
        width &&
        css`
            width: ${width};
        `}
    ${({ height }) =>
        height &&
        css`
            height: ${height};
        `}
    ${({ withoutTranslate }) =>
        !withoutTranslate &&
        css`
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `};
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ m }) =>
        m &&
        css`
            margin: ${m};
        `};
    ${({ onlyManualFocus }) =>
        !onlyManualFocus &&
        css`
            /* &:hover, */
            &:focus {
                .background-border {
                    opacity: 1;
                }
                & .background-ray {
                    opacity: 0.5;
                }
            }
        `};

    .overflow-wrapper {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        border-radius: 50%;
        ${({ radius }) =>
            radius &&
            css`
                border-radius: ${radius};
            `}
        overflow: hidden;
        ${({ withoutEllipse, focus }) =>
            !withoutEllipse &&
            css`
                ::after {
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
                    ${focus &&
                    css`
                        width: 150%;
                        height: 200%;
                        opacity: 0;
                    `};
                }
            `}
    }
    .background-ray,
    .background-border {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        position: absolute;
        border-radius: 50%;
        ${({ radius }) =>
            radius &&
            css`
                border-radius: ${radius};
            `}
        inset: 0;
        z-index: -1;
    }
    .background-ray {
        filter: blur(0.59375rem);
        position: absolute;
        width: 30%;
        height: 1000%;
        top: -450%;
        left: 40%;
        transform: translate(-50% -50%);
        background: linear-gradient(to right, transparent, white, transparent);
        animation: rotate 5s linear infinite;
        border-radius: 0;
        z-index: 0;
        opacity: 0;
    }
    .background-border {
        border: 0.0625rem solid rgba(255, 255, 255, 0.15);
        box-shadow: 0px 0.125rem 0.125rem 0px rgba(0, 0, 0, 0.25);
    }

    ${({ focus }) =>
        focus &&
        css`
            & .background-ray,
            .background-border {
                opacity: 1;
            }
            & .background-ray {
                opacity: 0.5;
            }
        `}

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const WithBorderAnimation = ({
    children,
    width,
    height,
    padding,
    wrapperBackground,
    m,
    focus,
    radius,
    withoutTranslate,
    withoutEllipse,
    onlyManualFocus,
}: {
    width?: string;
    height?: string;
    padding?: string;
    wrapperBackground?: string;
    m?: string;
    radius?: string;
    children?: ReactNode;
    focus?: boolean;
    withoutTranslate?: boolean;
    withoutEllipse?: boolean;
    onlyManualFocus?: boolean;
}) => {
    return (
        <StyledWithBorderAnimation
            width={width}
            height={height}
            padding={padding}
            wrapperBackground={wrapperBackground}
            m={m}
            focus={focus}
            radius={radius}
            withoutTranslate={withoutTranslate}
            withoutEllipse={withoutEllipse}
            onlyManualFocus={onlyManualFocus}
        >
            <div className="overflow-wrapper">
                <div className="background-ray" />
            </div>
            <div className="background-border" />
            {children}
        </StyledWithBorderAnimation>
    );
};
