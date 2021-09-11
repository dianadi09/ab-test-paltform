import {Link} from "react-router-dom";

function Test(props) {
    return (
        <tr>
            <td>{props.test.owner}</td>
            <td>{props.test.mainVersion}</td>
            <td>{props.test.candidateVersion}</td>
            <td>{props.test.candidatePercentage}</td>
            <td>{new Date(props.test.startDate).toLocaleString()}</td>
            <td>
                <Link to={"/tests/edit/"+props.test._id}>edit</Link> | <a href="#" onClick={() => { props.finishTest(props.test._id) }}>delete</a>
            </td>
        </tr>
    );
}

export default Test;

