import React from 'react';
import { AlertContextConsumer } from '../../context/AlertContext';

const Alert = () => {
  return (
    <AlertContextConsumer>
      {(context) =>
        context.alert !== null && (
          <div className={`alert-${context.alert.type}`}>
            <i className='fas fa-info-circle'>{context.alert.msg}</i>
          </div>
        )
      }
    </AlertContextConsumer>
  );
};

export default Alert;
