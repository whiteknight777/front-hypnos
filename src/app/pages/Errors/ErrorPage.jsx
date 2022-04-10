import React from "react";
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function ErrorPage() {
  let nav = useNavigate()
  return (
    <Result
    status="404"
    title="404"
    subTitle="Désolé, mais cette page n'exite pas..."
    extra={<Button shape="round" onClick={() => nav('/')}>Retour</Button>}
  />
  );
}

export default ErrorPage;