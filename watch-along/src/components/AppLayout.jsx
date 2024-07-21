import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div`
  height: 100vh;
  width: 100vw;
`;

function AppLayout() {
  return (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
}

export default AppLayout;
