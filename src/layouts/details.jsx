import { useParams } from 'react-router-dom';
export default function DetailPage(props){
    const {id}=useParams();
    console.log(id);
    return <div></div>
}