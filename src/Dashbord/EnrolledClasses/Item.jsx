import { Link } from "react-router-dom";

const Item = ({ item,index }) => {
    // console.log(item);
    return (
        <tr className="bg-base-200">
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item.instructorName}</td>
            {/* <td className="btn btn-outline p-2" > Continue Class </td> */}
            <Link to='/coures-content' state={item}>Countinue Class</Link>
        </tr>
    );

};

export default Item;