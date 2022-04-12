import React from "react";
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function NotAuthorizedPage() {
  let nav = useNavigate()
  return (
    <Result
    status="403"
    title="403"
    subTitle="Désolé, mais vous n'êtes pas autorisé(e) à accéder à cette page..."
    extra={<Button shape="round" onClick={() => nav('/')}>Retour</Button>}
  />
  );
}

export default NotAuthorizedPage;