import styled from "@emotion/styled";
import {Spin, Typography} from "antd";

export default styled.div<{
  gap?: number | boolean,//右侧间距设置
  between?: boolean,//内容是否居中
  marginBottom?:number,//距离底部距离
}>
  `
    display: flex;
    align-items: center;
    justify-content: ${ props => props.between ? 'space-between' : undefined };
    margin-bottom: ${ props => props.marginBottom ? props.marginBottom + 'rem' : 0 };
    > * {
      margin-top: 0!important;
      margin-bottom: 0!important;
      margin-right: ${ props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined}
    }
  `

export const FullPage = styled.div
  `
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `

/* 全屏加载效果 */
export const FullPageLoading = () => (
    <FullPage>
      <Spin size={'large'}></Spin>
    </FullPage>
)

/* 全屏加载错误效果 */
export const FullErrorFallBack = ({ error }:{error:Error | null }) => (
    <FullPage>
      <Typography.Text type={"danger"}>{ error?.message }</Typography.Text>
    </FullPage>
)
