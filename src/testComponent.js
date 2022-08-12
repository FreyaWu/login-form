import react from 'react';
import { login } from './utils';


export default function Test() {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email });
        } catch (e) {

        }
    }

    useEffect(() => {

    })

    return (
        <div className="test">
            <label for='email'>Email:</label>
            <input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <button className='button' onClick={handleLogin}></button>
        </div>
    )
}