import React from 'react';
import Style from './forgotPassword.module.css';
import ForgotPassword from '../components/LoginPage/forgotPassword'

function ForgotPasswordPage() {
  return (
    <div className={Style.imgBG}>
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage
