import { Helmet } from "react-helmet-async";
import UseManageClass from "../../Hooks/UseManageClass";
import ManageClassRow from "./ManageClassRow";

const ManageClass = () => {

    const [classes] = UseManageClass();
    return (
        <div>
            <Helmet>
                <title>MANAGE CLASS || SpeakUp</title>
            </Helmet>
            {/* Header */}
            <div className="flex flex-row items-center justify-between pe-2 bg-zinc-900 py-4 rounded-sm">
                <p className="text-sm text-white md:text-white font-semibold border-l-4 border-primary ml-2 inline-block px-2 md:px-5">
                    Manage All Classes
                </p>
            </div>
            {/* header end */}
            {/* <h3 className="text-center text-3xl font-semibold">Manage All Classes</h3> */}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image & Name</th>
                            <th>About Instructor</th>
                            <th>Current Status</th>
                            <th>Approved</th>
                            <th>View Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) => <ManageClassRow key={item._id} item={item} index={index}></ManageClassRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageClass;