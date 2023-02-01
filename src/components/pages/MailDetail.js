import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./SendMail.module.css";

const MailDetail = () => {
  const currEmail = useSelector((currState) => currState.auth.email);

  const specificEmail = useSelector((currState) => currState.obj.specificEmail);

  return (
    <Fragment>
      <div className={classes.box}>
        <div className="container">
          <h1 className="text-center">full mail</h1>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <h3>To: {currEmail}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>from: {specificEmail.email}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>message: {specificEmail.text}</h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default MailDetail;
