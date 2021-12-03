import './Header.css'
import Logo from './media/Logo.jpeg'



export default function Header() {
    return (
        <header >
            {/* <div className="container"> */}
            <img className='logo' src={Logo} alt="Logo" />
            <h1 className='title'>The Infallible Postcanine</h1>
            <ul className='navbar'>
            {/* <li className="navitem">Li 1</li>
            <li className="navitem">Li 2</li>
            <li className="navitem">Li 3</li> */}
            </ul>
            {/* </div>     */}
        </header>
        
    )
}
