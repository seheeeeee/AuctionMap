import React from "react";
import { css } from "@emotion/react";
import { Common } from "@src/styles/Common";

const Error = () => {
  const storage = window.localStorage.getItem("token");
  return (
    <div css={wrapper}>
      <p>
        인증에 실패했습니다. <br />
        다시 접속해주세요. <br />
        storage
        <br />
        {storage}
      </p>
    </div>
  );
};

const wrapper = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 64px;
    height: 64px;
  }

  p {
    padding: 10px;
    text-align: center;
    color: ${Common.colors.purple300};
    ${Common.textStyle.title1_B16}
  }
`;

export default Error;
