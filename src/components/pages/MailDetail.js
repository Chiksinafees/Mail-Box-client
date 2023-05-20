import { Fragment } from "react";
import { useSelector } from "react-redux";

const MailDetail = () => {
  const currEmail = useSelector((currState) => currState.auth.email);
  const specificEmail = useSelector((currState) => currState.obj.specificEmail);

  return (
    <Fragment>
      <div className="max-w-6xl my-28 mx-auto md:mx-10 bg-slate-950 px-6 py-10 rounded-lg text-white shadow-md font-serif overflow-hidden">
        <h1 className="text-5xl font-bold text-center font-serif mb-6">
          Full Mail
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="py-2">
                  <h3 className="text-lg font-semibold">To: {currEmail}</h3>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <h4 className="text-sm font-medium text-gray-300">
                    From: {specificEmail.email}
                  </h4>
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <h6 className="text-sm font-normal text-gray-300">
                    Message: {specificEmail.text}
                  </h6>
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
